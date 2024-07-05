export class Cloud extends Phaser.GameObjects.Sprite {
  tween?: Phaser.Tweens.Tween;
  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0, 'cloud');
    scene.add.existing(this);
  }

  hide() {
    this.setActive(false);
    this.setVisible(false);
    this.tween?.stop();
  }

  spawn(x: number, y: number, size: number) {
    this.setActive(true);
    this.setVisible(true);
    if (this.tween) {
      this.tween.destroy();
      this.tween = undefined;
    }

    this.setPosition(x, y);
    this.setScale(1 / Math.pow(size, 0.6));
    this.setAlpha(1 / Math.pow(size, 0.5));
    this.tween = this.scene.tweens.add({
      targets: this,
      x: { from: x, to: -100 },
      duration: 22500 / Math.pow(size, 0.7),
      onComplete: () => {
        this.hide();
      },
    });
  }
}
