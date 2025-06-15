import { TypedEventEmitter } from '@worksheets/phaser/events';
import { Coordinate, Point } from '@worksheets/phaser/types';

import { GAME_WIDTH } from '../../../settings';
import {
  equalCoordinate,
  isOutOfBounds,
  toCoordinate,
  toGridPosition,
} from '../../combat/grid/util';
import {
  RelicSingleTargeting,
  RelicSingleTargetingAction,
} from '../../relics/types';
import { TargetingEventEmitter } from '../scene';

export type SingleTargetTargetingOptions = {
  sprite: string;
  targeting: RelicSingleTargeting;
  events: TargetingEventEmitter;
};

export class SingleTargetTargeting extends Phaser.GameObjects.Container {
  options: SingleTargetTargetingOptions;
  origin: Point;
  sprites: Phaser.GameObjects.Sprite[];
  placements: Record<number, Coordinate>;

  constructor(scene: Phaser.Scene, options: SingleTargetTargetingOptions) {
    super(scene);

    this.origin = {
      x: GAME_WIDTH / 2,
      y: 300,
    };
    this.options = options;
    this.sprites = [];
    this.placements = {};

    this.create();
  }

  create() {
    const offset = this.options.targeting.numTargets % 2 === 0 ? 75 : 0;
    for (let i = 0; i < this.options.targeting.numTargets; i++) {
      const x = (i - Math.floor(this.options.targeting.numTargets / 2)) * 150;
      const sprite = new TargetingSprite(this.scene, {
        x: this.origin.x + x + offset,
        y: this.origin.y,
        sprite: this.options.sprite,
      });

      sprite.events.on('placed', (coords: Coordinate) => {
        if (
          Object.values(this.placements).some((c) => equalCoordinate(c, coords))
        ) {
          delete this.placements[i];
          return sprite.cancel();
        }

        this.placements[i] = coords;
        if (
          Object.keys(this.placements).length ===
          this.options.targeting.numTargets
        ) {
          this.options.events.emit('execute', {
            ...this.options.targeting,
            origins: Object.values(this.placements),
          });
        }
      });

      sprite.events.on('highlight', (point: Point) => {
        this.options.events.emit('highlight', {
          type: 'point',
          point,
        });
      });

      sprite.events.on('clear-highlights', () => {
        this.options.events.emit('highlight', {
          type: 'none',
        });
      });

      this.add(sprite);
      this.sprites.push(sprite);
    }
  }
}

type TargetingSpriteOptions = {
  x: number;
  y: number;
  sprite: string;
};

class TargetingSprite extends Phaser.GameObjects.Sprite {
  origin: Point;
  action: RelicSingleTargetingAction;
  events: TypedEventEmitter<{
    placed: [Coordinate];
    highlight: [Point];
    'clear-highlights': [];
  }>;

  constructor(scene: Phaser.Scene, { x, y, sprite }: TargetingSpriteOptions) {
    super(scene, x, y, sprite);

    this.events = new TypedEventEmitter();
    this.origin = { x, y };

    this.setInteractive({ draggable: true });

    this.on('dragstart', (pointer: Phaser.Input.Pointer) => {
      this.setPosition(pointer.x, pointer.y);
      this.setScale(0.5);
    });

    this.on('dragend', (pointer: Phaser.Input.Pointer) => {
      const point = { x: pointer.x, y: pointer.y };
      if (isOutOfBounds(point)) {
        this.cancel();
      } else {
        const coordinates = toCoordinate(point);
        const centered = toGridPosition(coordinates);
        this.setPosition(centered.x, centered.y);
        this.events.emit('placed', coordinates);
        this.events.emit('clear-highlights');
      }
    });

    this.on('drag', async (pointer: Phaser.Input.Pointer) => {
      const { x, y } = pointer;
      this.setPosition(x, y);

      this.events.emit('highlight', pointer);
    });
  }

  cancel() {
    this.events.emit('clear-highlights');
    this.setScale(1);
    this.setPosition(this.origin.x, this.origin.y);
  }
}
