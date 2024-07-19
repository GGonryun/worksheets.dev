import { Blocks } from '../objects/blocks';
export class Demo extends Phaser.Scene {
  constructor() {
    super('demo');
  }

  create() {
    const { width, height } = this.cameras.main;

    this.add.tileSprite(0, 0, width, height, 'wallpaper').setOrigin(0);

    this.add
      .bitmapText(width * 0.5, height * 0.5, 'peaberry', 'MAJOR', 32)
      .setDropShadow(4, 4, 0x000000, 1)
      .setOrigin(0.5);

    new Blocks(this, 1).setPosition(width * 0.35, height * 0.42);
  }
}
