import { grid, theme } from '../settings';
import { Block } from './block';
import { BlockGroup } from './block-group';
import { BlockGroupView } from './block-group-view';
import { Coordinate } from './coordinate';

export class GameGrid extends Phaser.GameObjects.Container {
  x: number;
  y: number;
  zones: Record<string, Phaser.GameObjects.Zone>;
  cells: Record<string, Phaser.GameObjects.Graphics>;
  texts: Record<string, Phaser.GameObjects.Text>;
  shadows: Record<string, BlockGroupView>;
  blocks: Record<string, Block>;

  constructor(scene: Phaser.Scene) {
    super(scene);
    const camera = scene.cameras.main;
    this.x =
      camera.width * 0.5 -
      (grid.size.rows * grid.cell.width) / 2 +
      grid.cell.width / 2;
    this.y = camera.height * 0.2;
    this.setPosition(this.x, this.y);
    this.scene.add.existing(this);

    this.zones = {};
    this.cells = {};
    this.texts = {};
    this.blocks = {};
    this.shadows = {};
  }

  create() {
    const { width, height } = grid.cell;
    const { rows, columns } = grid.size;

    const maxHeight = height * columns;

    for (let i = 0; i < rows; i++) {
      const x = i * width;
      for (let j = 0; j < columns; j++) {
        const y = maxHeight - j * height;
        const name = Coordinate.fromVector({ x: i, y: j }).toString();

        this.createZone(x, y, name);
        this.createCells(x, y, name);
        // this.createText(x, y, name);
      }
    }
  }

  zonePoint(coord: Coordinate) {
    const zone = this.zones[coord.toString()];
    return {
      x: this.x + zone.x,
      y: this.y + zone.y - grid.dragOffset + grid.cell.height / 2,
    };
  }

  createZone(x: number, y: number, name: string) {
    const zone = new Phaser.GameObjects.Zone(
      this.scene,
      x,
      y + grid.dragOffset,
      grid.cell.width,
      grid.cell.height
    )
      .setRectangleDropZone(grid.cell.width, grid.cell.height)
      .setName(name)
      .setOrigin(0.5, 0);

    this.add(zone);

    this.zones[name] = zone;
  }

  createCells(x: number, y: number, name: string) {
    const graphic = new Phaser.GameObjects.Graphics(this.scene)
      .setName(name)
      .fillStyle(theme.get().grid)
      .fillRoundedRect(
        x - grid.cell.width / 2,
        y,
        grid.cell.width - 2,
        grid.cell.height - 2,
        8
      );

    this.add(graphic);

    this.cells[name] = graphic;
  }

  createText(x: number, y: number, name: string) {
    const text = new Phaser.GameObjects.Text(
      this.scene,
      x,
      y + grid.cell.height / 2,
      name,
      {
        color: theme.get().text,
        fontSize: 10,
      }
    )
      .setOrigin(0.5, 0.5)
      .setDepth(1)
      .setText(name);
    this.add(text);

    this.texts[name] = text;
  }

  redraw() {
    Object.keys(this.texts).forEach((key) => {
      const text = this.texts[key];
      text.destroy();
      text.setVisible(false);
    });

    Object.keys(this.zones).forEach((key) => {
      const zone = this.zones[key];
      zone.destroy();
    });

    Object.keys(this.cells).forEach((key) => {
      const cells = this.cells[key];
      cells.clear();
      cells.destroy();
    });

    this.zones = {};
    this.cells = {};
    this.texts = {};
    this.create();

    Object.keys(this.shadows).forEach((key) => {
      const shadow = this.shadows[key];
      this.bringToTop(shadow);
      shadow.redraw();
    });

    Object.keys(this.blocks).forEach((key) => {
      const block = this.blocks[key];
      block.redraw();
      this.bringToTop(block);
    });
  }

  onDragLeave(_: BlockGroup, zone: Phaser.GameObjects.Zone) {
    this.removeShadow(zone);
  }

  removeShadow(zone: Phaser.GameObjects.Zone) {
    const shadow = this.shadows[zone.name];
    if (shadow) {
      shadow.destroy();
      delete this.shadows[zone.name];
    }
  }

  onDragEnter(group: BlockGroup, zone: Phaser.GameObjects.Zone) {
    if (!this.isVacant(Coordinate.fromString(zone.name), group)) {
      return;
    }

    const shadow = group.clone().setAlpha(0.5);
    this.add(shadow);
    shadow.y = zone.y - grid.dragOffset;
    shadow.x = zone.x;
    this.shadows[zone.name] = shadow;
  }

  isVacant(origin: Coordinate, group: BlockGroup) {
    const units = group.coordinates.map((coord) => coord.getNeighbor(origin));

    return units.every(
      (unit) => this.zones[unit.toString()] && !this.blocks[unit.toString()]
    );
  }

  getGroupCells(origin: Coordinate, group: BlockGroup) {
    const units = group.coordinates.map((coord) => coord.getNeighbor(origin));

    return units.map((unit) => this.cells[unit.toString()]);
  }

  async drop(group: BlockGroup, zone: Phaser.GameObjects.Zone) {
    this.removeShadow(zone);
    await this.placeBlocks(group, zone);
    return true;
  }

  canDrop(
    group: BlockGroup,
    zone: Phaser.GameObjects.Zone | { x: number; y: number }
  ) {
    let coordinate;
    if ('name' in zone) {
      coordinate = Coordinate.fromString(zone.name);
    } else {
      coordinate = Coordinate.fromVector(zone);
    }
    return this.isVacant(coordinate, group);
  }

  isOccupied(coord: Coordinate) {
    return this.blocks[coord.toString()];
  }

  async placeBlocks(group: BlockGroup, zone: Phaser.GameObjects.Zone) {
    const worldPosition = {
      x:
        group.worldPosition.x -
        this.x -
        group.grabOffset.x -
        grid.cell.width / 2,
      y: group.worldPosition.y - this.y - grid.dragOffset - group.grabOffset.y,
    };

    const anchor = Coordinate.fromString(zone.name);

    await Promise.all(
      group.coordinates.map((coordinate) => {
        return new Promise((resolve) => {
          const coord = coordinate.getNeighbor(anchor);
          const zone = this.zones[coord.toString()];

          const block = new Block(this.scene, group.view.color);
          const fromX = worldPosition.x + coordinate.x * 32;
          const fromY = worldPosition.y - coordinate.y * 32;
          const toX = zone.x - grid.cell.width / 2;
          const toY = zone.y - grid.dragOffset;

          this.scene.tweens.add({
            targets: block,
            x: {
              from: fromX,
              to: toX,
            },
            y: {
              from: fromY,
              to: toY,
            },
            duration: 200,
            ease: 'Power2',
            onComplete: () => {
              resolve(true);
            },
          });
          this.add(block);
          this.blocks[zone.name] = block;
        });
      })
    );
  }
}
