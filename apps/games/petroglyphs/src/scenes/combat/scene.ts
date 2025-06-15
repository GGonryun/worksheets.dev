import { TypedEventEmitter } from '@worksheets/phaser/events';
import { Point } from '@worksheets/phaser/types';
import { assertNever } from '@worksheets/util/errors';
import { randomKeyOf } from '@worksheets/util/objects';
import { waitFor } from '@worksheets/util/time';
import { last } from 'lodash';
import Phaser from 'phaser';

import { GameControllerScene } from '../game-controller/scene';
import { ORB_SPRITES } from '../orbs/data';
import { PortalController } from '../portal/portal';
import { BlurController } from '../util/blur';
import { ActionSkill } from './actions';
import { ComboDetector } from './combo/combo-detector';
import { ComboMessageSpawner } from './combo/combo-messages';
import { getCascadeMessage, getComboMatchMessage } from './combo/util';
import {
  CELL_SETTINGS,
  COMBO_DELAY,
  ElementDepths,
  GRID_SETTINGS,
  SCENE_TRANSITION_SPEED,
  TILE_TYPE_TO_COLOR,
  TILE_TYPE_TO_ORB,
} from './constants';
import { GridController } from './controller';
import { FallingBoulderSprite } from './falling-boulder';
import { Grid, SimpleGrid } from './grid/grid';
import { GridMask } from './grid/mask';
import { isOutOfBounds, toCoordinate } from './grid/util';
import { Particles } from './particles';
import { StageCompletionStar } from './star';
import { Color, TileType } from './types';
import { BASIC_TILES } from './util';

type CombatSceneEvents = {
  'screen-shake': [];
  'action-execution': [{ action: ActionSkill; from: Point; color: Color }];
  'process-tile': [{ type: TileType; origin: Point }];
};

export type CombatSceneOptions = {
  manager: GameControllerScene;
};

export class CombatScene extends Phaser.Scene {
  static key = 'CombatScene';
  private options: CombatSceneOptions;

  emitter: TypedEventEmitter<CombatSceneEvents>;

  blur: BlurController;
  controller: GridController;
  grid: Grid;
  particles: Particles;
  combo: ComboDetector;
  messages: ComboMessageSpawner;
  portal: PortalController;
  mask: GridMask;
  star: StageCompletionStar;

  constructor() {
    super(CombatScene.key);
  }

  static get(manager: Phaser.Scene): CombatScene {
    return manager.scene.get(CombatScene.key) as CombatScene;
  }

  static launch({ scene }: Phaser.Scene, options: CombatSceneOptions) {
    return scene.launch(CombatScene.key, options);
  }

  static stop({ scene }: Phaser.Scene) {
    return scene.stop(CombatScene.key);
  }

  async create(options: CombatSceneOptions) {
    this.cameras.main.fadeOut(0);

    this.options = options;

    this.combo = new ComboDetector();
    this.emitter = new TypedEventEmitter();
    this.controller = new GridController(this);
    this.particles = new Particles(this);
    this.blur = new BlurController(this);

    this.controller.create();

    const background = this.add.image(0, 0, 'game-background');
    background.setScale(1);
    background.setOrigin(0, 0);
    background.setDepth(ElementDepths.BACKGROUND);

    this.grid = new Grid(this, this);
    this.grid.setDepth(ElementDepths.GRID);
    this.grid.create();
    this.add.existing(this.grid);

    this.mask = new GridMask(this, this.grid);
    this.mask.disable();
    this.add.existing(this.mask);

    this.messages = new ComboMessageSpawner(this);
    this.add.existing(this.messages);

    this.portal = new PortalController(this);
    this.add.existing(this.portal);

    this.star = new StageCompletionStar(this);
    this.add.existing(this.star);

    this.createEvents();
  }

  createEvents() {
    this.options.manager.bus.on('start-combat', () => {
      this.cameras.main.fadeIn(SCENE_TRANSITION_SPEED);
    });

    this.cameras.main.on(
      Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE,
      async () => {
        const grid = SimpleGrid.perfectFill(
          this,
          GRID_SETTINGS.rows,
          GRID_SETTINGS.columns
        );

        await this.grid.acquire(async () => {
          await this.grid.fill(grid);
          this.mask.enable();
        });
      }
    );

    this.options.manager.bus.on('open-spell-targeting', async () => {
      this.controller.lock();
    });

    this.options.manager.bus.on('close-spell-targeting', () => {
      this.controller.unlock();
    });

    this.options.manager.bus.on('highlight-cells', (payload) => {
      switch (payload.type) {
        case 'none': {
          return this.grid.resetHighlights();
        }
        case 'point': {
          return this.grid.highlightCellsAtPoint(payload.point);
        }
        case 'circle': {
          const shape = new Phaser.Geom.Circle(
            payload.x,
            payload.y,
            payload.radius
          );
          return this.grid.highlightCellsInCircle(shape);
        }
        case 'diagonal': {
          const point = toCoordinate(payload.point);
          if (isOutOfBounds(point)) return;
          return this.grid.highlightCellsInDiagonals(point);
        }
        case 'tile': {
          const packet = this.grid.findCellAt(payload.point);
          if (!packet) return;
          return this.grid.highlightCellsByType(packet.cell.options.type);
        }
        case 'column': {
          return this.grid.highlightCellsInColumn(payload.column);
        }
        case 'row': {
          return this.grid.highlightCellsInRow(payload.row);
        }
        default:
          throw assertNever(payload);
      }
    });

    this.options.manager.bus.on('spell-cast', async ({ key, data }) => {
      this.options.manager.report.track({
        type: 'spell-cast',
        relic: key,
      });
      this.grid.resetHighlights();
      this.grid.cancelSelection();

      switch (data.type) {
        case 'single-target': {
          switch (data.action.type) {
            case 'destroy-tiles':
              await this.grid.destroyTiles(data.origins);
              break;
            case 'replace-tiles':
              await this.grid.replaceTiles({
                coordinates: data.origins,
                to: data.action.to,
              });
              break;

            default:
              throw assertNever(data.action);
          }
          break;
        }
        case 'circular': {
          const cells = this.grid.findCellsInCircle(
            new Phaser.Geom.Circle(data.origin.x, data.origin.y, data.radius)
          );
          await this.grid.destroyTiles(
            cells.inside.map((cell) => cell.coordinates)
          );
          break;
        }
        case 'diagonal': {
          await this.grid.destroyDiagonals(data.origin);
          break;
        }
        case 'tile-type': {
          const packet = this.grid.findCellAt(data.point);
          if (!packet) return;
          await this.grid.destroyType(packet.cell.options.type);
          break;
        }
        case 'instant': {
          switch (data.execute) {
            case 'shuffle':
              await this.grid.shuffleTiles();
              break;
            default:
              throw assertNever(data.execute);
          }
          break;
        }
        case 'line': {
          if (data.direction === 'row') {
            await this.grid.destroyRow(data.row);
          } else {
            await this.grid.destroyColumn(data.col);
          }
          break;
        }

        default:
          throw assertNever(data);
      }
    });

    this.controller.events.on('drag', ({ axis, point, distance }) => {
      const selection = toCoordinate(point);
      if (isOutOfBounds(selection)) return;

      const { row, col } = toCoordinate(point);
      if (axis === 'horizontal') {
        this.grid.moveRow({ row, distance });
      } else {
        this.grid.moveColumn({ col, distance });
      }

      this.grid.highlightSelectionMatches(point);
    });

    this.controller.events.on('dragstart', async ({ axis, x, y }) => {
      const selection = toCoordinate({ x, y });
      if (isOutOfBounds(selection)) return;
      if (axis === 'horizontal') {
        await this.grid.selectRow(selection);
      } else {
        await this.grid.selectColumn(selection);
      }
    });

    this.grid.events.on('tile-moved', async ({ cell, coordinates }) => {
      if (cell.options.type === 'BOMB') {
        await this.grid.destroyTiles([coordinates]);
      }
      if (cell.options.type === 'BOULDER') {
        await this.grid.destroyTiles([coordinates]);
      }
    });

    this.grid.events.on('tile-selection', () => {
      this.grid.events.emit('scan-board');
      this.options.manager.bus.emit('increase-turns', 1);
      this.options.manager.bus.emit('process-cooldowns', {
        type: 'turns',
        amount: 1,
      });
    });

    this.controller.events.on('confirm-dragend', (point) => {
      this.grid.makeSelection(point);
    });

    let scanning = false;
    this.grid.events.on('scan-board', async () => {
      if (scanning) return;
      if (this.grid.isLocked()) return;
      scanning = true;

      let matches = await this.grid.solve();
      this.combo.increment(matches);
      while (matches.length > 0) {
        await waitFor(COMBO_DELAY);
        matches = await this.grid.solve();
        this.combo.increment(matches);
      }
      this.combo.reset();

      scanning = false;
    });

    this.grid.events.on('tile-match', async (match) => {
      this.options.manager.report.track({ type: 'tile-match', match });
      this.options.manager.bus.emit('activate-relics', {
        type: 'match',
        match,
      });
      this.options.manager.bus.emit('process-cooldowns', {
        type: 'matches',
        amount: 1,
        tile: match.tileType,
      });
    });

    this.grid.events.on('before-tile-spent', async (point, tile) => {
      const origin = this.grid.getCenteredWorldPosition(point);
      switch (tile) {
        case 'RED':
        case 'YELLOW':
        case 'GREEN':
        case 'BLUE':
        case 'PURPLE':
        case 'RAINBOW':
        case 'CRATE':
        case 'BOMB':
          return;
        case 'BOULDER': {
          const boulder = new FallingBoulderSprite(
            this,
            origin,
            CELL_SETTINGS.scale
          );
          this.add.existing(boulder);
          this.time.delayedCall(3000, () => {
            boulder.destroy();
          });
          return;
        }
        default:
          throw assertNever(tile);
      }
    });

    this.grid.events.on('tile-spent', async (point, tile) => {
      this.options.manager.report.track({ type: 'tile-spent', tile });
      this.options.manager.bus.emit(
        'add-experience',
        this.options.manager.stats.computeExperience(tile)
      );

      const origin = this.grid.getCenteredWorldPosition(point);

      this.particles.explosion({
        color: TILE_TYPE_TO_COLOR[tile],
        at: origin,
      });

      switch (tile) {
        case 'RED':
        case 'YELLOW':
        case 'GREEN':
        case 'BLUE':
        case 'CRATE':
        case 'PURPLE': {
          this.emitter.emit('process-tile', { type: tile, origin });
          break;
        }
        case 'BOMB': {
          this.emitter.emit('process-tile', { type: 'BOMB', origin });
          break;
        }
        case 'BOULDER': {
          this.emitter.emit('process-tile', { type: 'BOULDER', origin });
          break;
        }
        case 'RAINBOW': {
          for (const tile of BASIC_TILES) {
            this.emitter.emit('process-tile', { type: tile, origin });
          }
          break;
        }
        default:
          throw assertNever(tile);
      }
    });

    this.star.events.on('continue', async () => {
      this.cameras.main.fadeOut(
        SCENE_TRANSITION_SPEED,
        255,
        255,
        255,
        (_: unknown, progress: number) => {
          if (progress === 1) {
            this.options.manager.bus.emit('show-constellation');
          }
        }
      );
    });

    this.emitter.on('process-tile', async ({ type, origin }) => {
      this.options.manager.bus.emit('process-cooldowns', {
        type: 'tiles',
        amount: 1,
        tile: type,
      });
      if (type !== 'CRATE') {
        this.options.manager.bus.emit('summon-orb', {
          orb: TILE_TYPE_TO_ORB[type],
          point: origin,
        });
      }
    });

    this.combo.events.on('cascade', (matches) => {
      const match = last(matches);
      if (!match) {
        console.error('Match is undefined', matches);
        return;
      }
      const origin = Phaser.Math.RND.pick(match.coordinates);
      if (!origin) {
        console.error('Origin is undefined', match);
        return;
      }
      this.messages.sweep(
        this.grid.getCenteredWorldPosition(origin),
        [getCascadeMessage(matches.length), 'BONUS ORBS++'],
        match.tileType
      );

      for (const match of matches) {
        this.options.manager.bus.emit('summon-orb', {
          orb: TILE_TYPE_TO_ORB[match.tileType],
          point: this.grid.getCenteredWorldPosition(
            Phaser.Math.RND.pick(match.coordinates)
          ),
        });
      }

      this.options.manager.report.track({
        type: 'cascade',
        length: matches.length,
      });
      this.options.manager.bus.emit('activate-relics', {
        type: 'cascade',
        size: matches.length,
      });
    });

    this.combo.events.on('combo', (matches) => {
      if (matches.length > 1) {
        const match = Phaser.Math.RND.pick(matches);
        const origin = Phaser.Math.RND.pick(match.coordinates);

        if (!origin) {
          console.error('Origin is undefined', match);
          return;
        }
        const point = this.grid.getCenteredWorldPosition(origin);
        this.messages.sweep(
          { x: point.x, y: point.y },
          [getComboMatchMessage(matches.length), 'BONUS ORBS++'],
          match.tileType
        );

        for (const match of matches) {
          this.options.manager.bus.emit('summon-orb', {
            orb: TILE_TYPE_TO_ORB[match.tileType],
            point: this.grid.getCenteredWorldPosition(
              Phaser.Math.RND.pick(match.coordinates)
            ),
          });
        }
      }
      this.cameras.main.shake(200, 0.01);
      this.options.manager.report.track({
        type: 'combo',
        length: matches.length,
      });
      this.options.manager.bus.emit('activate-relics', {
        type: 'combo',
        size: matches.length,
      });
    });

    this.options.manager.bus.on('stage-complete', async () => {
      this.mask.disable();
      this.grid.absorbAll();

      await this.portal.close();
      await this.star.appear();
    });

    this.options.manager.bus.on(
      'execute-skill',
      async ({ key, action, from, color }) => {
        this.options.manager.report.track({
          type: 'relic-activation',
          relic: key,
        });
        this.particles.explosion({
          color,
          at: from,
        });

        switch (action.type) {
          case 'destroy-tiles':
            await this.grid.destroyRandom({
              ...action,
              tiles: action.tiles ?? BASIC_TILES,
            });
            break;
          case 'attack':
            this.options.manager.bus.emit('increase-score', action.amount);
            break;
          case 'destroy-column':
            await this.grid.destroyColumn(
              Phaser.Math.Between(0, GRID_SETTINGS.columns - 1)
            );
            break;
          case 'destroy-row':
            await this.grid.destroyRow(
              Phaser.Math.Between(0, GRID_SETTINGS.rows - 1)
            );
            break;
          case 'heal':
            this.options.manager.bus.emit('increase-turns', -action.amount);
            break;
          case 'generate-orb': {
            for (let i = 0; i < action.amount; i++) {
              this.options.manager.bus.emit('summon-orb', {
                orb: action.key ?? randomKeyOf(ORB_SPRITES),
                point: from,
              });
            }
            break;
          }
          case 'replace-tiles': {
            await this.grid.replaceTiles(action);
            break;
          }
          case 'shuffle': {
            await this.grid.shuffleTiles();
            break;
          }
          default:
            throw assertNever(action);
        }
      }
    );

    this.options.manager.bus.on('open-relic-info', () => {
      this.blur.display();
      this.controller.lock();
    });

    this.options.manager.bus.on('close-relic-info', () => {
      this.blur.remove();
      this.controller.unlock();
    });
  }

  update(time: number) {
    this.controller.update();
    this.portal.onUpdate(time);
  }

  async fadeOut() {
    return new Promise((resolve) => {
      this.cameras.main.fadeOut(
        SCENE_TRANSITION_SPEED,
        0,
        0,
        0,
        (_: unknown, progress: number) => {
          if (progress === 1) {
            resolve(true);
          }
        }
      );
    });
  }
}
