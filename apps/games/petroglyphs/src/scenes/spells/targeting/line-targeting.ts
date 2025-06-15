import { TypedEventEmitter } from '@worksheets/phaser/events';
import { Coordinate, Point } from '@worksheets/phaser/types';
import { assertNever } from '@worksheets/util/errors';

import { GAME_WIDTH } from '../../../settings';
import {
  CELL_SETTINGS,
  GRID_SETTINGS,
  ICON_SIZE,
} from '../../combat/constants';
import { isOutOfBounds, toCoordinate } from '../../combat/grid/util';
import {
  RelicLineTargeting,
  RelicSpellLineTargetingData,
} from '../../relics/types';
import { TargetingEventEmitter } from '../scene';

export type LineTargetingOptions = {
  sprite: string;
  targeting: RelicLineTargeting;
  events: TargetingEventEmitter;
};

export class LineTargeting extends Phaser.GameObjects.Container {
  options: LineTargetingOptions;
  origin: Point;
  pointer: PointerSprite;
  constructor(scene: Phaser.Scene, options: LineTargetingOptions) {
    super(scene);
    this.origin = {
      x: GAME_WIDTH / 2,
      y: 300,
    };
    this.options = options;
    this.create();
  }

  create() {
    const sprite = new BoulderSprite(this.scene, this.origin.x, this.origin.y);
    sprite.events.on('confirm', (opts) => {
      this.options.events.emit('execute', {
        ...this.options.targeting,
        ...opts,
      });
    });

    sprite.events.on('column', (col) => {
      this.setPointer({ direction: 'column', col });
    });

    sprite.events.on('row-left', (row) => {
      this.setPointer({ direction: 'row', row, placement: 'left' });
    });

    sprite.events.on('row-right', (row) => {
      this.setPointer({ direction: 'row', row, placement: 'right' });
    });

    sprite.events.on('clear', () => {
      this.clearPointer();
      this.options.events.emit('highlight', { type: 'none' });
    });

    this.add(sprite);

    const pointer = new PointerSprite(this.scene, 0, 0, this.options.sprite);
    pointer.setVisible(false);
    pointer.setScale(0.4);

    this.add(pointer);
    this.pointer = pointer;
  }

  setPointer(opts: RelicSpellLineTargetingData) {
    switch (opts.direction) {
      case 'row': {
        if (opts.placement === 'left') {
          this.options.events.emit('highlight', {
            type: 'row',
            row: opts.row,
          });
          this.pointer.setVisible(true);
          this.pointer.setRotation(-Math.PI / 2);
          this.pointer.setPosition(
            GRID_SETTINGS.x - 10,
            GRID_SETTINGS.y +
              CELL_SETTINGS.size / 2 +
              CELL_SETTINGS.size * opts.row
          );
        } else {
          this.options.events.emit('highlight', {
            type: 'row',
            row: opts.row,
          });
          this.pointer.setVisible(true);
          this.pointer.setRotation(Math.PI / 2);
          this.pointer.setPosition(
            GRID_SETTINGS.x + GRID_SETTINGS.width + 10,
            GRID_SETTINGS.y +
              CELL_SETTINGS.size / 2 +
              CELL_SETTINGS.size * opts.row
          );
        }
        break;
      }

      case 'column': {
        this.options.events.emit('highlight', {
          type: 'column',
          column: opts.col,
        });
        this.pointer.setVisible(true);
        this.pointer.setRotation(0);
        this.pointer.setPosition(
          GRID_SETTINGS.x +
            CELL_SETTINGS.size / 2 +
            CELL_SETTINGS.size * opts.col,
          GRID_SETTINGS.y - 16
        );
        break;
      }
      default:
        throw assertNever(opts);
    }
  }

  clearPointer() {
    this.pointer.setVisible(false);
  }
}

class PointerSprite extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, x: number, y: number, sprite: string) {
    super(scene, x, y);

    const pointer = new Phaser.GameObjects.Sprite(
      this.scene,
      0,
      0,
      'icons-disadvantage'
    );
    pointer.setScale(0.6);
    this.add(pointer);

    // make the pointer bob up and down
    this.scene.tweens.add({
      targets: pointer,
      y: 10,
      duration: 500,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1,
    });

    const boulder = new Phaser.GameObjects.Sprite(
      this.scene,
      0,
      -ICON_SIZE + 48,
      sprite
    );
    this.add(boulder);
  }
}

class BoulderSprite extends Phaser.GameObjects.Sprite {
  origin: Point;
  events: TypedEventEmitter<{
    confirm: [RelicSpellLineTargetingData];
    column: [number];
    'row-left': [number];
    'row-right': [number];
    clear: [];
  }>;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'icons-boulder');

    this.events = new TypedEventEmitter();
    this.origin = { x, y };

    this.setInteractive({ draggable: true });

    this.on('dragstart', (pointer: Phaser.Input.Pointer) => {
      this.setPosition(pointer.x, pointer.y);
      this.setScale(0.5);
    });

    this.on('dragend', (pointer: Phaser.Input.Pointer) => {
      const point = { x: pointer.x, y: pointer.y };
      if (isOutOfBounds(point)) return this.cancel();
      const { row, col } = toCoordinate(point);
      if (this.isOutOfBounds({ row, col })) return this.cancel();

      // figure out if x is closer to the row or column
      const r = this.checkPlacement(point);
      if (r === 'column') {
        this.events.emit('confirm', { direction: 'column', col });
      } else {
        this.events.emit('confirm', { direction: 'row', row, placement: r });
      }
    });

    this.on('drag', async (pointer: Phaser.Input.Pointer) => {
      this.setPosition(pointer.x, pointer.y);
      const point = { x: pointer.x, y: pointer.y };

      if (isOutOfBounds(point)) {
        return this.events.emit('clear');
      }
      const { row, col } = toCoordinate(point);
      if (this.isOutOfBounds({ row, col })) {
        return this.events.emit('clear');
      }

      // figure out if x is closer to the row or column
      const placement = this.checkPlacement(pointer);
      if (placement === 'column') {
        this.events.emit('column', col);
      } else if (placement === 'left') {
        this.events.emit('row-left', row);
      } else {
        this.events.emit('row-right', row);
      }
    });
  }

  isOutOfBounds({ row, col }: Coordinate) {
    if (row === -1 && col === -1) {
      return true;
    }

    if (row === -1 && col === GRID_SETTINGS.columns) {
      return true;
    }
    // we are okay with any rows from -1 to rows + 1; but not the corners
    if (row < -1 || row > GRID_SETTINGS.rows) {
      return true;
    }
    if (col < -1 || col > GRID_SETTINGS.columns) {
      return true;
    }
    if (row >= GRID_SETTINGS.rows) {
      return true;
    }
    return false;
  }

  checkPlacement({ x, y }: Point): 'left' | 'right' | 'column' {
    const columnDistance = Math.abs(GRID_SETTINGS.y - y);
    const rowDistance = Math.abs(GRID_SETTINGS.x - x);

    if (y < GRID_SETTINGS.y) {
      return 'column';
    }
    if (x < GRID_SETTINGS.x) {
      return 'left';
    }

    const end = GRID_SETTINGS.x + GRID_SETTINGS.width;
    const threshold = 24;
    if (x > end - threshold) {
      return 'right';
    }
    return rowDistance < columnDistance ? 'left' : 'column';
  }

  cancel() {
    this.setScale(1);
    this.setPosition(this.origin.x, this.origin.y);
  }
}
