import { Point } from '@worksheets/phaser/types';

import { GAME_WIDTH } from '../../../settings';
import { GRID_SETTINGS } from '../../combat/constants';
import { isOutOfBounds } from '../../combat/grid/util';
import { RADIUS_TO_SIZE } from '../../relics/data';
import { RelicCircleTargeting } from '../../relics/types';
import { TargetingEventEmitter } from '../scene';
import { TargetingCursor } from '../targeting';

export type CircularTargetingOptions = {
  targeting: RelicCircleTargeting;
  sprite: string;
  events: TargetingEventEmitter;
};

export class CircularTargeting extends Phaser.GameObjects.Container {
  options: CircularTargetingOptions;
  origin: Point;
  areaOfEffect: Phaser.GameObjects.Graphics;
  sprite: Phaser.GameObjects.Sprite;

  constructor(scene: Phaser.Scene, options: CircularTargetingOptions) {
    super(scene);

    this.options = options;
    this.origin = {
      x: GAME_WIDTH / 2,
      y: 300,
    };

    this.create();
  }

  create() {
    const { targeting } = this.options;
    const radius = RADIUS_TO_SIZE[targeting.radius];

    this.areaOfEffect = new TargetingCursor(this.scene, {
      ...this.origin,
      lineWidth: 6,
      radius,
    });
    this.add(this.areaOfEffect);

    const maskRect = new Phaser.GameObjects.Rectangle(
      this.scene,
      GRID_SETTINGS.x,
      GRID_SETTINGS.y,
      GRID_SETTINGS.width,
      GRID_SETTINGS.height,
      0x000000,
      0
    ).setOrigin(0, 0);
    this.add(maskRect);
    const mask = maskRect.createGeometryMask();
    this.areaOfEffect.setMask(mask);

    const sprite = new Phaser.GameObjects.Sprite(
      this.scene,
      this.origin.x,
      this.origin.y,
      this.options.sprite
    );

    sprite.setInteractive({ draggable: true });
    sprite.on('dragstart', (pointer: Phaser.Input.Pointer) => {
      const { x, y } = pointer;
      sprite.setPosition(x, y);
      sprite.setScale(0.5);

      this.areaOfEffect.setPosition(x, y);
      this.areaOfEffect.setVisible(true);
    });
    sprite.on('dragend', (pointer: Phaser.Input.Pointer) => {
      const point = { x: pointer.x, y: pointer.y };
      if (isOutOfBounds(point)) {
        this.sprite.setPosition(this.origin.x, this.origin.y);
        this.sprite.setVisible(true);
        this.sprite.setScale(1);
      } else {
        this.options.events.emit('execute', {
          ...this.options.targeting,
          origin: point,
          radius,
        });
      }
    });
    sprite.on('drag', (pointer: Phaser.Input.Pointer) => {
      const { x, y } = pointer;

      this.areaOfEffect.setPosition(x, y);

      sprite.setPosition(x, y);

      this.options.events.emit('highlight', { type: 'circle', x, y, radius });
    });

    this.add(sprite);
    this.sprite = sprite;
  }
}
