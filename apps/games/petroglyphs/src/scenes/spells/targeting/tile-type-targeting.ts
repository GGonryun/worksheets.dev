import { Point } from '@worksheets/phaser/types';

import { GAME_WIDTH } from '../../../settings';
import { isOutOfBounds } from '../../combat/grid/util';
import { RelicTileTypeTargeting } from '../../relics/types';
import { TargetingEventEmitter } from '../scene';

export type TileTypeTargetingOptions = {
  targeting: RelicTileTypeTargeting;
  sprite: string;
  events: TargetingEventEmitter;
};

export class TileTypeTargeting extends Phaser.GameObjects.Container {
  options: TileTypeTargetingOptions;
  origin: Point;
  constructor(scene: Phaser.Scene, options: TileTypeTargetingOptions) {
    super(scene);
    this.origin = {
      x: GAME_WIDTH / 2,
      y: 300,
    };
    this.options = options;
    this.create();
  }

  create() {
    const sprite = new Phaser.GameObjects.Sprite(
      this.scene,
      this.origin.x,
      this.origin.y,
      this.options.sprite
    )
      .on('dragstart', (pointer: Phaser.Input.Pointer) => {
        sprite.setPosition(pointer.x, pointer.y);
        sprite.setScale(0.5);
      })
      .on('dragend', (pointer: Phaser.Input.Pointer) => {
        const point = { x: pointer.x, y: pointer.y };
        if (!isOutOfBounds(point)) {
          this.options.events.emit('execute', {
            ...this.options.targeting,
            point,
          });
        }

        this.options.events.emit('highlight', { type: 'none' });
        sprite.setScale(1);
        sprite.setPosition(this.origin.x, this.origin.y);
      })
      .on('drag', async (pointer: Phaser.Input.Pointer) => {
        sprite.setPosition(pointer.x, pointer.y);

        this.options.events.emit('highlight', {
          type: 'tile',
          point: { x: pointer.x, y: pointer.y },
        });

        if (isOutOfBounds(pointer)) {
          this.options.events.emit('highlight', { type: 'none' });
        } else {
          this.options.events.emit('highlight', {
            type: 'tile',
            point: pointer,
          });
        }
      })
      .setInteractive({ draggable: true });

    this.add(sprite);
  }
}
