import { Point } from '@worksheets/phaser/types';

import { DEPTHS } from '../settings/data';

export class Indicator extends Phaser.GameObjects.Sprite {
  target: Phaser.GameObjects.Components.Transform;
  offset: Point;
  constructor(
    scene: Phaser.Scene,
    target: Phaser.GameObjects.Components.Transform,
    offset?: Partial<Point>
  ) {
    super(scene, 0, 0, 'ui-indicator', 0);

    this.target = target;
    this.offset = {
      x: offset?.x ?? 0,
      y: offset?.y ?? 0,
    };

    scene.add.existing(this);
    this.setDepth(DEPTHS.CAR);
  }

  update() {
    this.x = this.target.x + this.offset.x;
    this.y = this.target.y + this.offset.y;
  }
}
