import { Point } from '@worksheets/phaser/types';

import { PORTRAIT_FRAMES, PORTRAIT_KEY } from '../settings/data';
import { CarType } from './car';

export class PlayerPortrait extends Phaser.GameObjects.Sprite {
  enabled: boolean;
  constructor(
    scene: Phaser.Scene,
    options: Point & {
      type: CarType;
      initialize?: boolean;
    }
  ) {
    const { x, y, type, initialize } = options;
    const key = PORTRAIT_KEY[type];
    const endFrame = PORTRAIT_FRAMES[type];
    super(scene, x, y, key);
    if (!this.anims.exists(key)) {
      this.anims.create({
        key,
        frames: this.anims.generateFrameNumbers(key, {
          start: 0,
          end: endFrame,
        }),
        frameRate: 2,
        yoyo: true,
        repeat: -1,
      });
    }

    if (initialize) {
      this.start();
      this.enabled = true;
    }
  }

  start() {
    if (this.enabled) return this;
    this.play(this.texture.key);
    return this;
  }

  override stop() {
    this.enabled = false;
    super.stop();
    return this;
  }
}
