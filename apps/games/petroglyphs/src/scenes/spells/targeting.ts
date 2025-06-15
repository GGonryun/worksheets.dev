export class TargetingCursor extends Phaser.GameObjects.Graphics {
  constructor(
    scene: Phaser.Scene,
    {
      x,
      y,
      radius,
      lineWidth,
    }: { x: number; y: number; radius: number; lineWidth: number }
  ) {
    super(scene);
    this.lineStyle(lineWidth, 0xffffff, 1);
    this.strokeCircle(0, 0, radius);
    this.setPosition(x, y);
    this.setVisible(false);
  }
}
