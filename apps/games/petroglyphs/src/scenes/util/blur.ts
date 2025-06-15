export class BlurController {
  blur: Phaser.FX.Blur | undefined;
  scene: Phaser.Scene;
  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  display() {
    if (this.blur) return;
    this.blur = this.scene.cameras.main.postFX.addBlur(
      0,
      1,
      1,
      2,
      0xffffff,
      16
    );
  }

  remove() {
    if (this.blur) {
      this.scene.cameras.main.postFX.remove(this.blur);
      this.blur.destroy();
      this.blur = undefined;
    }
  }
}
