import { TypedEventEmitter } from '@worksheets/phaser/events';
import { Coordinate, Direction, Point } from '@worksheets/phaser/types';
import { toArray, toArrayAsync } from '@worksheets/util/arrays';
import { entriesOf, valuesOf } from '@worksheets/util/objects';
import { waitFor } from '@worksheets/util/time';
import { uniqBy } from 'lodash';

import { absorbFunction } from '../../portal/portal';
import {
  CELL_SETTINGS,
  GRID_SETTINGS,
  MIN_MATCH_SIZE,
  MOVEMENTS,
  TILE_CONSUMPTION_SPEED,
  TILE_MOVEMENT_DELAY,
  TILE_MOVEMENT_SPEED,
  TILE_PROCESSING_SPEED,
} from '../constants';
import { GridController } from '../controller';
import { Lock } from '../lock';
import {
  directionToTileMatchType,
  mergeMatches,
  removeOverlapping,
} from '../matching';
import { TileMatch, TileType } from '../types';
import { BASIC_TILES } from '../util';
import { Cell } from './cell';
import { GridEvents } from './types';
import {
  CellPacket,
  cellTermination,
  equalCoordinate,
  toCoordinate,
} from './util';

export type CellHighlightRequest =
  | { type: 'none' }
  | { type: 'point'; point: Point }
  | {
      type: 'circle';
      x: number;
      y: number;
      radius: number;
    }
  | { type: 'diagonal'; point: Point }
  | { type: 'tile'; point: Point }
  | { type: 'row'; row: number }
  | { type: 'column'; column: number };

export type DestructionProcessing = {
  spent: Coordinate[];
  missing: Record<number, number>;
  match: TileMatch;
};

export type GridOptions = {
  controller: GridController;
};

export class Grid extends Phaser.GameObjects.Container {
  slots: (Cell | null)[][];
  spares: Cell[][];
  moving: Cell[];
  selected: CellPacket[];
  selection: Coordinate | undefined;
  events: TypedEventEmitter<GridEvents>;
  controller: GridController;

  private processLock: Lock;

  constructor(scene: Phaser.Scene, { controller }: GridOptions) {
    super(scene);

    this.slots = new Array(GRID_SETTINGS.rows)
      .fill(null)
      .map(() => new Array(GRID_SETTINGS.columns).fill(null));
    this.spares = new Array(GRID_SETTINGS.columns).fill(null).map(() => []);
    this.moving = [];
    this.selected = [];
    this.controller = controller;

    this.events = new TypedEventEmitter();
    this.processLock = new Lock('boolean');
  }

  create() {
    this.setPosition(GRID_SETTINGS.x, GRID_SETTINGS.y);
  }

  async fill(grid: SimpleGrid) {
    const promises: Promise<unknown>[] = [];

    // make a fake grid of colors.
    for (let row = 0; row < GRID_SETTINGS.rows; row++) {
      for (let col = 0; col < GRID_SETTINGS.columns; col++) {
        const coordinates = { row, col };
        const cell = grid.get(coordinates);
        cell.setScale(0);
        this.addExistingCell(cell, coordinates);

        promises.push(
          new Promise((resolve) =>
            absorbFunction(this.scene, {
              object: cell,
              offset: this,
              delayModifier: Phaser.Math.RND.between(0, 5),
              reversed: true,
              objectScale: CELL_SETTINGS.scale,
              onComplete: () => resolve(true),
            })
          )
        );
      }
    }

    return await Promise.all(promises);
  }

  async absorbAll() {
    // NOTE: using a separate wait for lock function causes things to happen synchronously. this is not ideal.
    while (this.processLock.locked) {
      await waitFor(100);
    }
    this.cancelSelection();
    this.processLock.close();

    for (const spare of this.list) {
      if (spare instanceof Cell) {
        this.scene.tweens.killTweensOf(spare);
        absorbFunction(this.scene, {
          object: spare,
          offset: this,
          delayModifier: Phaser.Math.RND.between(0, 5),
          onComplete: () => {
            this.events.emit('tile-absorbed', spare);
          },
        });
      }
    }
  }

  async destroyAll() {
    await this.acquire(async () => {
      for (let row = 0; row < GRID_SETTINGS.rows; row++) {
        for (let col = 0; col < GRID_SETTINGS.columns; col++) {
          await waitFor(TILE_PROCESSING_SPEED);
          this.cleanUp({ row, col });
        }
      }

      this.slots = new Array(GRID_SETTINGS.rows)
        .fill(null)
        .map(() => new Array(GRID_SETTINGS.columns).fill(null));
      this.clearSpares();
      this.moving = [];
      this.selected = [];
    });
  }

  clearSpares() {
    const spares = this.spares.flat();
    for (const spare of spares) {
      this.remove(spare);
      spare.destroy();
    }
    this.spares = new Array(GRID_SETTINGS.columns).fill(null).map(() => []);
  }

  isLocked() {
    return this.processLock.locked;
  }

  unlock() {
    this.processLock.open();
  }

  lock() {
    this.processLock.close();
  }

  getWidthCenter() {
    const cols = GRID_SETTINGS.columns;
    const width = cols * CELL_SETTINGS.size + cols * GRID_SETTINGS.gap;
    return width / 2;
  }

  async selectRow(selection: Coordinate) {
    if (this.isLocked()) return;

    await this.select(selection, this.iterateRow.bind(this));
  }

  async selectColumn(selection: Coordinate) {
    if (this.isLocked()) return;

    await this.select(selection, this.iterateColumn.bind(this));
  }

  async select(
    selection: Coordinate,
    selector: (selection: Coordinate) => AsyncGenerator<CellPacket>
  ) {
    this.selection = selection;

    const selected = await toArrayAsync(selector(selection));
    selected.forEach((s) => s.cell.setAlpha(0));
    const clones = () => selected.map((s) => s.cell.clone());
    const moving = [...clones(), ...clones(), ...clones()];

    this.add(moving);

    this.selected = selected;
    this.moving = moving;
  }

  cancelSelection() {
    this.moving.forEach((cell) => {
      this.remove(cell);
      cell.destroy();
    });
    this.selected.forEach((cell) => {
      cell.cell.setAlpha(1);
    });
    this.moving = [];
    this.selected = [];
    this.selection = undefined;
    this.clearHighlights();
  }

  highlightSelectionMatches(point: Point) {
    if (!this.selection) return;
    // take the current selection and pretend like we're going to place it in the new location.
    // and then search for matches
    const selection = toCoordinate(point);

    if (this.isOutOfBounds(selection)) {
      return;
    }

    // for each cell update it's position to the new location.
    const grid = this.createManipulationGrid();
    for (const cell of this.moving) {
      const { x, y } = this.getWorldPosition(cell);
      const coordinates = toCoordinate({
        x: x + CELL_SETTINGS.size / 2,
        y: y + CELL_SETTINGS.size / 2,
      });

      if (this.isOutOfBounds(coordinates)) {
        continue;
      }

      grid.set(coordinates, cell);
    }

    const matches = grid.findMatches();
    const matchingCells = matches
      .map((m) => m.coordinates.map((c) => grid.get(c)))
      .flat();

    for (const cell of grid.cells.flat()) {
      if (matchingCells.includes(cell)) {
        cell.highlight(0xffffff);
      } else {
        cell.unhighlight();
      }
    }
  }

  clearHighlights() {
    for (const cell of this.list) {
      if (cell instanceof Cell) {
        cell.unhighlight();
      }
    }
  }

  makeSelection(drop: Point) {
    if (!this.selection) return false;

    const selection = toCoordinate(drop);
    // this type of comparison is not perfect. normally we only move a tile if it's at least half way into the next cell. we lose some precision because we're using the cursor position.
    if (equalCoordinate(selection, this.selection)) {
      return this.cancelSelection();
    }
    if (this.isOutOfBounds(selection)) {
      return this.cancelSelection();
    }

    let overwrites = false;
    const moved: CellPacket[] = [];
    this.moving.forEach((cell) => {
      const { x, y } = this.getWorldPosition(cell);
      const coordinates = toCoordinate({
        x: x + CELL_SETTINGS.size / 2,
        y: y + CELL_SETTINGS.size / 2,
      });

      if (this.isOutOfBounds(coordinates)) {
        this.remove(cell);
        cell.destroy();
      } else {
        overwrites = this.setCell(cell, coordinates) || overwrites;
        this.onDeselect(cell);
        moved.push({ cell, coordinates });
      }
    });

    this.list.forEach((c) => {
      const child = c as Cell;
      if (this.slots.flat().includes(child)) {
        // otherwise reset it's style. it may have been selected previously
        // child.unhighlight();
      } else {
        // if the child isn't a cell in a slot delete it.
        this.remove(child);
        child.destroy();
      }
    });
    this.moving = [];
    this.selected = [];

    if (overwrites) {
      this.events.emit('tile-selection', {
        from: this.selection,
        to: selection,
      });
    }

    this.selection = undefined;

    for (const packet of moved) {
      this.events.emit('tile-moved', packet);
    }
  }

  getWorldPosition(cell: Coordinate | Cell): Point {
    if (!cell) {
      throw new Error('Cell is undefined');
    }
    if ('row' in cell) {
      const pos = this.toGridPosition(cell);
      return { x: pos.x + this.x, y: pos.y + this.y };
    }
    return { x: cell.x + this.x, y: cell.y + this.y };
  }

  getCenteredWorldPosition(cell: Coordinate | Cell): Point {
    const pos = this.getWorldPosition(cell);
    return {
      x: pos.x + CELL_SETTINGS.size / 2,
      y: pos.y + CELL_SETTINGS.size / 2,
    };
  }

  onDeselect(cell: Cell) {
    cell.setAlpha(1);
  }

  moveRow({ row, distance }: { row: number; distance: number }) {
    if (this.isLocked()) return;
    if (!this.moving.length) return;
    if (this.selection?.row !== row) {
      console.warn('Row mismatch', this.selection);
      return this.cancelSelection();
    }
    const r = this.moving;
    const offset = distance;
    r.forEach((cell, index) => {
      const col = index - GRID_SETTINGS.rows;
      const target = this.toGridPosition({ row, col });
      cell.setPosition(target.x + offset, target.y);
    });
  }

  moveColumn({ col, distance }: { col: number; distance: number }) {
    if (this.isLocked()) return;
    if (!this.moving.length) return;
    if (this.selection?.col !== col) {
      console.warn('Column mismatch');
      return this.cancelSelection();
    }
    const c = this.moving;
    const offset = distance;
    c.forEach((cell, index) => {
      const row = index - GRID_SETTINGS.columns;
      const target = this.toGridPosition({ row, col });
      cell.setPosition(target.x, target.y + offset);
    });
  }

  toGridPosition({ row, col }: Coordinate): Point {
    return {
      x: col * CELL_SETTINGS.size + col * GRID_SETTINGS.gap,
      y: row * CELL_SETTINGS.size + row * GRID_SETTINGS.gap,
    };
  }

  getWorldBounds(): Phaser.Geom.Rectangle {
    const bounds = this.getBounds();
    const matrix = this.getBoundsTransformMatrix();
    const decomposed = matrix.decomposeMatrix();
    return new Phaser.Geom.Rectangle(
      decomposed.translateX,
      decomposed.translateY,
      bounds.height,
      bounds.width
    );
  }

  cleanUp(coordinates: Coordinate) {
    const cell = this.getSlot(coordinates);
    if (cell) {
      this.remove(cell);
      cell.destroy();
    }
    this.slots[coordinates.row][coordinates.col] = null;
  }

  async spend(cell: Cell, coordinates: Coordinate): Promise<boolean> {
    if (cell.options.layer === 'slime') {
      await cell.removeLayer();
      return false;
    }

    this.events.emit('before-tile-spent', coordinates, cell.options.type);
    await this.terminate(cell, coordinates);
    this.events.emit('tile-spent', coordinates, cell.options.type);
    return true;
  }

  async terminate(
    cell: Cell,
    coordinates: Coordinate,
    speed: number = TILE_CONSUMPTION_SPEED
  ) {
    this.slots[coordinates.row][coordinates.col] = null;
    await cellTermination(
      this.scene,
      cell,
      (cell) => {
        cell.tile.setTintFill(0xffffff);
      },
      {
        x: cell.x + CELL_SETTINGS.size / 2,
        y: cell.y + CELL_SETTINGS.size / 2,
      },
      speed
    );

    this.remove(cell);
    cell.destroy();
  }

  async acquire<T>(fn: () => Promise<T>): Promise<T> {
    // NOTE: using a separate wait for lock function causes things to happen synchronously. this is not ideal.
    while (this.processLock.locked) {
      await waitFor(100);
    }

    this.processLock.close();
    const result = this.controller.acquire(async () => {
      const result = await fn();
      return result;
    });
    this.processLock.open();
    return result;
  }

  private async destroyCellsHelper(coordinates: Coordinate[]) {
    const spent: Coordinate[] = [];
    const missing: Record<number, number> = {};

    const afflicted = this.unique(await this.findAfflictedCells(coordinates));

    await Promise.all(
      afflicted.map(async (coords) => {
        const cell = this.getSlot(coords);
        if (!cell) return;
        const { col } = coords;
        if (!(await this.spend(cell, coords))) return;

        spent.push(coords);

        if (!missing[col]) missing[col] = 0;
        missing[col]++;
      })
    );

    return { spent, missing };
  }

  private async findAfflictedCells(
    coordinates: Coordinate[]
  ): Promise<Coordinate[]> {
    const afflictedSet = new Set<string>();
    const results: Coordinate[] = [];

    const processCell = (coordinate: Coordinate) => {
      const coordKey = `${coordinate.row},${coordinate.col}`;

      // Avoid reprocessing the same cell.
      if (afflictedSet.has(coordKey)) return;
      afflictedSet.add(coordKey);
      results.push(coordinate);

      const cell = this.getSlot(coordinate);
      if (!cell) return;

      if (cell.options.type === 'BOMB') {
        const surrounding = valuesOf(MOVEMENTS)
          .map((m) => {
            const point = {
              row: coordinate.row + m.row,
              col: coordinate.col + m.col,
            };
            return this.isOutOfBounds(point) ? null : point;
          })
          .filter((p) => p !== null) as Coordinate[];

        for (const surroundingCell of surrounding) {
          processCell(surroundingCell);
        }
      } else if (cell.options.type === 'BOULDER') {
        const beneathCells = toArray(this.iterateBeneath(coordinate)).map(
          (c) => c.coordinates
        );

        for (const beneathCell of beneathCells) {
          processCell(beneathCell);
        }
      }
    };

    for (const coord of coordinates) {
      processCell(coord);
    }

    return results;
  }

  private async replaceCells(missing: Record<number, number>[]) {
    const merged = missing.reduce((acc, curr) => {
      for (const [col, quantity] of entriesOf(curr)) {
        if (!acc[col]) acc[col] = 0;
        acc[col] += quantity;
      }
      return acc;
    }, {} as Record<number, number>);
    const total = Object.values(merged).reduce((acc, curr) => acc + curr, 0);

    // replace the missing cells with new ones.
    for (const [col, quantity] of entriesOf(merged)) {
      this.addSpares({ quantity, col: +col });
    }
    for (let row = GRID_SETTINGS.rows - 1; row >= 0; row--) {
      for (let col = 0; col < GRID_SETTINGS.columns; col++) {
        const cell = this.getSlot({ row, col });
        if (!cell) {
          // look for the first cell above that is not empty.
          this.findAbove({ row, col });
        }
      }
    }
    total > 0 && (await waitFor(TILE_MOVEMENT_DELAY));
  }

  async solveHelper(matches: TileMatch[]) {
    const processed = await Promise.all(
      matches.map(async (m) => ({
        ...(await this.destroyCellsHelper(m.coordinates)),
        match: m,
      }))
    );

    const made: TileMatch[] = [];
    for (const { spent, match } of processed) {
      made.push({ ...match, coordinates: spent });
    }

    await this.replaceCells(processed.map((p) => p.missing));

    return made;
  }

  async solve() {
    return await this.acquire(async () => {
      const grid = this.createManipulationGrid();
      const matches = grid.findMatches();

      const processed = await this.solveHelper(matches);

      for (const m of processed) {
        this.events.emit('tile-match', m);
      }

      return processed;
    });
  }

  private async destroyCells(coordinates: Coordinate[]) {
    const { spent, missing } = await this.destroyCellsHelper(coordinates);
    await this.replaceCells([missing]);
    return spent;
  }

  async slimeTiles(
    opts: { amount: number },
    preprocess: (cell: Cell) => Promise<unknown>
  ) {
    await this.acquire(async () => {
      const coordinates = await this.randomCells(opts);
      const promises: Promise<unknown>[] = [];
      for (let i = 0; i < coordinates.length; i++) {
        promises.push(
          new Promise((resolve) => {
            const tile = this.getCell(coordinates[i]);
            waitFor(i * TILE_CONSUMPTION_SPEED * 1.5).then(() => {
              preprocess(tile).then(() => {
                tile.addSlime();
                resolve(true);
              });
            });
          })
        );
      }

      await Promise.all(promises);
    });
  }

  async destroyTiles(coordinates: Coordinate[]) {
    await this.acquire(async () => {
      await this.destroyCells(coordinates);
    });
  }

  async destroyRandom(opts: { amount: number; tiles: TileType[] }) {
    await this.acquire(async () => {
      const random = await this.randomCells({
        amount: opts.amount,
        validTypes: opts.tiles,
      });
      await this.destroyCells(random);
    });
  }

  async destroyRow(row: number) {
    await this.acquire(async () => {
      const cells = await toArrayAsync(this.iterateRow(row));
      const coordinates = cells.map((c) => c.coordinates);
      await this.destroyCells(coordinates);
    });
  }

  private unique(array: Coordinate[]) {
    return uniqBy(array, (c) => `${c.row}-${c.col}`);
  }

  async destroyColumn(column: number) {
    await this.acquire(async () => {
      const cells = await toArrayAsync(this.iterateColumn(column));
      const coordinates = cells.map((c) => c.coordinates);
      await this.destroyCells(coordinates);
    });
  }

  async destroyDiagonals(point: Coordinate) {
    await this.acquire(async () => {
      const cells = await toArrayAsync(this.iterateDiagonals(point));
      const coordinates = cells.map((c) => c.coordinates);
      await this.destroyCells(coordinates);
    });
  }

  async destroyType(type: TileType) {
    await this.acquire(async () => {
      const toDestroy = (await toArrayAsync(this.iterateCells()))
        .filter((c) => c.cell.options.type === type)
        .map((c) => c.coordinates);
      await this.destroyCells(toDestroy);
    });
  }

  async replaceTiles({
    amount,
    to,
    from,
    coordinates,
  }: {
    amount?: number;
    to: TileType;
    from?: TileType;
    coordinates?: Coordinate[];
  }) {
    await this.acquire(async () => {
      if (!coordinates && !amount) {
        throw new Error('Coordinates or amount must be provided');
      }

      if (coordinates && amount && coordinates.length !== amount) {
        throw new Error('Amount must match the number of coordinates');
      }

      const selection = amount
        ? await this.randomCells({
            amount: amount,
            validTypes: from ? [from] : BASIC_TILES.filter((t) => t !== to),
          })
        : coordinates ?? [];

      for (const point of selection) {
        await this.terminate(this.getCell(point), point);

        this.addCell(point.row, point.col, to);
      }
    });
  }

  async shuffleTiles() {
    await this.acquire(async () => {
      const cells = await toArrayAsync(this.iterateCells());
      for (const { cell, coordinates } of cells) {
        // TODO: shuffling tiles should use the existing tiles, not create new ones.
        await this.terminate(cell, coordinates, TILE_CONSUMPTION_SPEED / 12);
        this.addCell(coordinates.row, coordinates.col);
      }
    });
  }

  async randomCells({
    amount,
    validTypes,
  }: {
    amount: number;
    validTypes?: TileType[];
  }) {
    const selection: Coordinate[] = [];
    for await (const { cell, coordinates } of this.iterateCells()) {
      if (validTypes && !validTypes.includes(cell.options.type)) continue;
      selection.push(coordinates);
    }

    return Phaser.Utils.Array.Shuffle(selection).slice(0, amount);
  }

  async highlightAll() {
    for await (const { cell } of this.iterateCells()) {
      cell.highlight();
    }
  }

  async highlightCellsInRow(row: number) {
    for await (const { cell, coordinates } of this.iterateCells()) {
      if (coordinates.row === row) {
        cell.highlight();
      } else {
        cell.unhighlight();
      }
    }
  }

  async highlightCellsInColumn(column: number) {
    for await (const { cell, coordinates } of this.iterateCells()) {
      if (coordinates.col === column) {
        cell.highlight();
      } else {
        cell.unhighlight();
      }
    }
  }

  async highlightCellsInDiagonals(point: Coordinate) {
    const diagonals = await toArrayAsync(this.iterateDiagonals(point));
    for await (const { cell, coordinates } of this.iterateCells()) {
      if (diagonals.some((d) => equalCoordinate(d.coordinates, coordinates))) {
        cell.highlight();
      } else {
        cell.unhighlight();
      }
    }
  }

  highlightCellsInCircle(circle: Phaser.Geom.Circle) {
    const { inside, outside } = this.findCellsInCircle(circle);
    for (const { cell } of inside) {
      cell.highlight();
    }

    for (const { cell } of outside) {
      cell.unhighlight();
    }
  }

  async highlightCellsByType(type: TileType) {
    for await (const { cell } of this.iterateCells()) {
      if (cell.options.type === type) {
        cell.highlight();
      } else {
        cell.unhighlight();
      }
    }
  }

  async highlightCellsAtPoint(point: Point) {
    const coordinates = toCoordinate(point);
    const grid = this.createManipulationGrid();

    if (grid.isOutOfBounds(coordinates)) return;

    const target = this.getSlot(coordinates);
    if (!target) return;

    for await (const { cell } of this.iterateCells()) {
      if (cell === target) {
        cell.highlight();
      } else {
        cell.unhighlight();
      }
    }
  }

  findCellsInCircle(circle: Phaser.Geom.Circle) {
    const inside: CellPacket[] = [];
    const outside: CellPacket[] = [];
    for (let row = 0; row < GRID_SETTINGS.rows; row++) {
      for (let col = 0; col < GRID_SETTINGS.columns; col++) {
        const cell = this.getSlot({ row, col });
        if (!cell) continue;
        const pos = this.getWorldPosition({ row, col });
        const rect = new Phaser.Geom.Rectangle(
          pos.x,
          pos.y,
          CELL_SETTINGS.size,
          CELL_SETTINGS.size
        );
        if (Phaser.Geom.Intersects.CircleToRectangle(circle, rect)) {
          inside.push({ cell, coordinates: { row, col } });
        } else {
          outside.push({ cell, coordinates: { row, col } });
        }
      }
    }
    return { inside, outside };
  }

  resetHighlights() {
    for (let row = 0; row < GRID_SETTINGS.rows; row++) {
      for (let col = 0; col < GRID_SETTINGS.columns; col++) {
        const cell = this.getSlot({ row, col });
        if (cell) {
          cell.unhighlight();
        }
      }
    }
  }

  isOutOfBounds({ row, col }: Coordinate) {
    const grid = this.createManipulationGrid();
    return grid.isOutOfBounds({ row, col });
  }

  findCellAt(point: Point): CellPacket | undefined {
    const coordinates = toCoordinate(point);
    const grid = this.createManipulationGrid();
    if (grid.isOutOfBounds(coordinates)) return undefined;

    const cell = this.getSlot(coordinates);
    if (!cell) return undefined;

    return { cell, coordinates };
  }

  findAbove({ row, col }: Coordinate) {
    for (let r = row - 1; r >= 0; r--) {
      const above = this.getSlot({ row: r, col });
      if (above) {
        this.moveCell(above, { row, col });
        this.slots[r][col] = null;
        return;
      }
    }
    const spare = this.spares[col].shift();
    if (!spare) {
      this.addSpare(col);
      this.findAbove({ row, col });
      return;
    }
    this.moveCell(spare, { row, col });
  }

  addSpares({ quantity, col }: { quantity: number; col: number }) {
    for (let i = 0; i < quantity; i++) {
      this.addSpare(col);
    }
  }

  addSpare(column: number) {
    const spares = this.spares[column];
    const cell = new Cell(this.scene, {
      type: Phaser.Math.RND.pick([...BASIC_TILES, 'CRATE']),
      ...CELL_SETTINGS,
    });
    spares.push(cell);

    const target = this.toGridPosition({
      row: -spares.length,
      col: +column,
    });
    cell.setCellPosition(target);
    this.add(cell);
    this.sendToBack(cell);
  }

  addCell(row: number, col: number, type?: TileType) {
    const c = new Cell(this.scene, {
      type: type ?? Phaser.Math.RND.pick([...BASIC_TILES, 'CRATE']),
      ...CELL_SETTINGS,
    });

    return this.addExistingCell(c, { row, col });
  }

  addExistingCell(cell: Cell, { row, col }: Coordinate) {
    this.setCell(cell, { row, col });
    this.add(cell);
    this.sendToBack(cell);
    return cell;
  }

  /**
   * Returns true if the existing cell is a different than the one being placed.
   */
  setCell(cell: Cell, { row, col }: Coordinate) {
    const original = this.slots[row][col];
    const target = this.toGridPosition({ row, col });
    cell.setCellPosition(target);
    this.slots[row][col] = cell;

    return Boolean(original && original.options.type !== cell.options.type);
  }

  async moveCell(cell: Cell, coordinates: Coordinate) {
    const target = this.toGridPosition(coordinates);
    const { row, col } = coordinates;
    this.slots[row][col] = cell;

    this.events.emit('tile-moved', { cell, coordinates });

    await new Promise((resolve) => {
      this.scene.tweens.add({
        targets: cell,
        x: target.x,
        y: target.y,
        duration: TILE_MOVEMENT_SPEED,
        ease: Phaser.Math.Easing.Bounce.Out,
        onComplete: resolve,
      });
    });
  }

  getSlot({ row, col }: Coordinate): Cell | null {
    return this.slots[row][col];
  }

  getCell({ row, col }: Coordinate): Cell {
    // try to get the cell three times, if it fails, throw an error.
    for (let i = 0; i < 3; i++) {
      const cell = this.getSlot({ row, col });
      if (cell) return cell;
      console.error(
        'Cell not found in slot, creating new ones as a last ditch effort',
        { row, col }
      );
      return this.addCell(row, col);
    }

    throw new Error('Cell not found in slot, attempts exhausted');
  }

  async *iterateSlots(): AsyncGenerator<{
    slot: Cell | null;
    coordinates: Coordinate;
  }> {
    for (let row = 0; row < GRID_SETTINGS.rows; row++) {
      for (let col = 0; col < GRID_SETTINGS.columns; col++) {
        const coordinates = { row, col };
        yield { slot: this.getSlot(coordinates), coordinates };
      }
    }
  }

  async *iterateCells(): AsyncGenerator<CellPacket> {
    for (let row = 0; row < GRID_SETTINGS.rows; row++) {
      for (let col = 0; col < GRID_SETTINGS.columns; col++) {
        const coordinates = { row, col };
        const slot = this.getSlot(coordinates);
        if (slot) {
          yield { cell: slot, coordinates };
        }
      }
    }
  }

  createManipulationGrid() {
    const maxAttempts = 5;
    for (let i = 0; i < maxAttempts; i++) {
      try {
        const cells: Cell[][] = [];
        for (let row = 0; row < GRID_SETTINGS.rows; row++) {
          for (let col = 0; col < GRID_SETTINGS.columns; col++) {
            const coordinates = { row, col };
            const slot = this.getSlot(coordinates);
            if (slot) {
              cells[coordinates.row] = cells[coordinates.row] ?? [];
              cells[coordinates.row][coordinates.col] = slot;
            }
          }
        }
        return new SimpleGrid(cells);
      } catch (error) {
        console.warn(
          'Failed to create manipulation grid trying again...',
          error,
          i
        );
      }
    }
    throw new Error('Failed to create manipulation grid');
  }

  getSlotColumn(column: number): (Cell | null)[] {
    return this.slots.map((row) => row[column]);
  }

  getCellColumn(column: number): Cell[] {
    return this.getSlotColumn(column).filter((cell) => cell !== null) as Cell[];
  }

  getSlotRow(row: number): (Cell | null)[] {
    return this.slots[row];
  }

  getCellRow(row: number): Cell[] {
    return this.getSlotRow(row).filter((cell) => cell !== null) as Cell[];
  }

  async *iterateRow(data: number | Coordinate): AsyncGenerator<CellPacket> {
    let row = 0;
    if (typeof data === 'number') {
      row = data;
    } else {
      row = data.row;
    }

    for (let col = 0; col < GRID_SETTINGS.columns; col++) {
      yield {
        coordinates: { row, col },
        cell: this.getCell({ row, col }),
      };
    }
  }

  async *iterateColumn(data: number | Coordinate): AsyncGenerator<CellPacket> {
    let col = 0;
    if (typeof data === 'number') {
      col = data;
    } else {
      col = data.col;
    }

    for (let row = 0; row < GRID_SETTINGS.rows; row++) {
      yield {
        coordinates: { row, col },
        cell: this.getCell({ row, col }),
      };
    }
  }

  *iterateBeneath(coordinates: Coordinate): Generator<CellPacket> {
    const { row, col } = coordinates;
    for (let r = row + 1; r < GRID_SETTINGS.rows; r++) {
      yield {
        coordinates: { row: r, col },
        cell: this.getCell({ row: r, col }),
      };
    }
  }

  async *iterateDiagonals(data: Coordinate): AsyncGenerator<CellPacket> {
    const { row, col } = data;
    let r = row;
    let c = col;
    while (r >= 0 && c >= 0) {
      yield {
        coordinates: { row: r, col: c },
        cell: this.getCell({ row: r, col: c }),
      };
      r--;
      c--;
    }

    r = row + 1;
    c = col + 1;
    while (r < GRID_SETTINGS.rows && c < GRID_SETTINGS.columns) {
      yield {
        coordinates: { row: r, col: c },
        cell: this.getCell({ row: r, col: c }),
      };
      r++;
      c++;
    }

    r = row;
    c = col;
    while (r >= 0 && c < GRID_SETTINGS.columns) {
      yield {
        coordinates: { row: r, col: c },
        cell: this.getCell({ row: r, col: c }),
      };
      r--;
      c++;
    }

    r = row + 1;
    c = col - 1;

    while (r < GRID_SETTINGS.rows && c >= 0) {
      yield {
        coordinates: { row: r, col: c },
        cell: this.getCell({ row: r, col: c }),
      };
      r++;
      c--;
    }
  }
}

export class SimpleGrid {
  cells: Cell[][];
  constructor(cells: Cell[][]) {
    if (cells.flat().some((c) => !c)) {
      throw new Error('All cells must be filled!');
    }
    this.cells = cells;
  }

  static perfectFill(scene: Phaser.Scene, rows: number, columns: number) {
    const pick = (): TileType =>
      Phaser.Math.RND.pick([...BASIC_TILES, 'CRATE']);
    const create = () =>
      new Cell(scene, {
        type: pick(),
        ...CELL_SETTINGS,
      });

    const cells = new Array(rows)
      .fill(null)
      .map(() => new Array(columns).fill(null).map(() => create()));

    const grid = new SimpleGrid(cells);
    let matches = grid.findMatches();
    while (matches.length) {
      for (const match of matches) {
        for (const coord of match.coordinates) {
          grid.set(coord, create());
        }
      }
      matches = grid.findMatches();
    }
    return grid;
  }

  findMatches() {
    const matches: TileMatch[] = [];
    const columns = this.cells[0].length;
    const rows = this.cells.length;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        for (const d of ['down', 'right', 'left', 'up'] as const) {
          const match = this.scan({ row, col, direction: d });
          if (match && match.coordinates.length >= MIN_MATCH_SIZE) {
            matches.push(match);
          }
        }
      }
    }
    return mergeMatches(removeOverlapping(matches));
  }

  scan({
    row,
    col,
    direction,
  }: {
    row: number;
    col: number;
    direction: Direction;
  }): TileMatch | undefined {
    const coordinates = { row, col };
    const progress: Coordinate[] = [coordinates];
    const cell = this.get(coordinates);

    const { row: r, col: c } = MOVEMENTS[direction];
    while (!this.isOutOfBounds(coordinates)) {
      row += r;
      col += c;
      if (this.isOutOfBounds({ row, col })) break;

      const target = { row, col };
      const targetCell = this.get(target);
      if (this.matching(cell, targetCell)) {
        progress.push(target);
      } else {
        break;
      }
    }
    return {
      tileType: cell.options.type,
      coordinates: progress,
      matchType: directionToTileMatchType[direction],
    };
  }

  matching(primary: Cell, secondary: Cell) {
    if (!secondary || !primary) return false;
    const isThisCellBasic = BASIC_TILES.includes(primary.options.type);
    const isOtherCellBasic = BASIC_TILES.includes(secondary.options.type);
    if (isThisCellBasic && isOtherCellBasic) {
      return primary.options.type === secondary.options.type;
    }

    const isThisCellCrate = primary.options.type === 'CRATE';
    const isOtherCellCrate = secondary.options.type === 'CRATE';
    if (isThisCellCrate && isOtherCellCrate) {
      return true;
    }

    const isThisCellRainbow = primary.options.type === 'RAINBOW';
    if (isThisCellRainbow) return false;

    const isOtherCellRainbow = secondary.options.type === 'RAINBOW';
    if (isOtherCellRainbow && isThisCellBasic) return true;

    return false;
  }

  isOutOfBounds(location: Coordinate): boolean {
    const { row, col } = location;
    return row < 0 || row >= this.rows || col < 0 || col >= this.columns;
  }

  get({ row, col }: Coordinate): Cell {
    return this.cells[row][col];
  }

  set({ row, col }: Coordinate, cell: Cell) {
    this.cells[row][col] = cell;
  }

  get rows() {
    return this.cells.length;
  }

  get columns() {
    return this.cells[0].length;
  }
}
