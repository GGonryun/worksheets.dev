import { Game } from '../scenes/game';

export class Dust extends Phaser.GameObjects.Sprite {
  tween: Phaser.Tweens.Tween | undefined;
  constructor(scene: Game) {
    super(scene, 0, 0, 'dust');
    this.setVisible(false);
    this.setOrigin(0.5, 0.5);
    this.scene.add.existing(this);
    this.setDepth(1);

    if (!this.anims.exists('dust')) {
      this.anims.create({
        key: 'dust',
        frames: this.anims.generateFrameNumbers('dust', {
          start: 0,
          end: 4,
        }),
        frameRate: 8,
        repeat: 0,
      });
    }
  }

  spawn(x: number, y: number) {
    // tween it to disappear to the left.
    this.reset();

    this.setPosition(x, y);
    this.setVisible(true);
    this.play('dust');

    this.tween = this.scene.tweens.add({
      targets: this,
      x: -100,
      duration: 1000,
      onComplete: () => {
        this.setVisible(false);
      },
    });
  }

  reset() {
    if (this.tween) {
      // cancel the previous tween
      this.tween.stop();
      // reset the position
      this.x = 0;
      // reset the tween
      this.tween = undefined;
      // stop the animation
      this.anims.stop();
      // reset the frame
      this.setFrame(0);
    }
  }
}
