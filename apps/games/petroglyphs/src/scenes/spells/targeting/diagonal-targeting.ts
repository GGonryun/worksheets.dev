import { TypedEventEmitter } from '@worksheets/phaser/events';
import { Coordinate, Point } from '@worksheets/phaser/types';

import { GAME_WIDTH } from '../../../settings';
import { isOutOfBounds, toCoordinate } from '../../combat/grid/util';
import { RelicDiagonalTargeting } from '../../relics/types';
import { TargetingEventEmitter } from '../scene';

export type DiagonalTargetingOptions = {
  targeting: RelicDiagonalTargeting;
  sprite: string;
  events: TargetingEventEmitter;
};

export class DiagonalTargeting extends Phaser.GameObjects.Container {
  options: DiagonalTargetingOptions;
  origin: Point;

  constructor(scene: Phaser.Scene, options: DiagonalTargetingOptions) {
    super(scene);

    this.origin = {
      x: GAME_WIDTH / 2,
      y: 300,
    };
    this.options = options;

    this.create();
  }

  create() {
    const sprite = new TargetingSprite(
      this.scene,
      this.origin.x,
      this.origin.y,
      this.options.sprite
    );
    sprite.events.on('confirm', (origin) => {
      this.options.events.emit('execute', {
        ...this.options.targeting,
        origin,
      });
    });
    sprite.events.on('cancel', () => {
      this.options.events.emit('highlight', { type: 'none' });
    });
    sprite.events.on('highlight', (point) => {
      this.options.events.emit('highlight', { type: 'diagonal', point });
    });

    this.add(sprite);
  }
}

class TargetingSprite extends Phaser.GameObjects.Sprite {
  origin: Point;
  events: TypedEventEmitter<{
    confirm: [Coordinate];
    cancel: [];
    highlight: [Point];
  }>;

  constructor(scene: Phaser.Scene, x: number, y: number, sprite: string) {
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
        this.setScale(1);
        this.setPosition(this.origin.x, this.origin.y);
        this.events.emit('cancel');
      } else {
        const cell = toCoordinate(point);
        this.events.emit('confirm', cell);
      }
    });

    this.on('drag', async (pointer: Phaser.Input.Pointer) => {
      const { x, y } = pointer;
      this.setPosition(x, y);

      if (isOutOfBounds({ x, y })) {
        this.events.emit('cancel');
      } else {
        this.events.emit('highlight', pointer);
      }
    });
  }
}
