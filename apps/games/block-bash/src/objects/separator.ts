import { theme } from '../settings';

export class Separator extends Phaser.GameObjects.Graphics {
  constructor(scene: Phaser.Scene) {
    super(scene);
    scene.add.existing(this);
    this.create();
  }

  create() {
    // a dashed line to separate the game area from the block area
    const camera = this.scene.cameras.main;
    const { width, height } = camera;
    this.lineStyle(3, theme.get().separator, 1);
    this.beginPath();
    const dash_length = 10;
    const gap_length = 10; /* staring point of your line */
    let x = width * 0.15;
    const y = height * 0.64;
    this.moveTo(x, y);
    while (x < width * 0.85) {
      x += dash_length;
      this.lineTo(x, y);
      x += gap_length;
      this.moveTo(x, y);
      this.closePath();
      this.strokePath();
    }
  }

  redraw() {
    this.clear();
    this.create();
  }
}
