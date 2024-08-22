import { DEPTHS } from '../../data';

export class Icon extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    this.setDepth(DEPTHS.UI);
    this.setInteractive({ useHandCursor: true });
    this.setOrigin(0, 0);

    this.on(
      'pointerdown',
      () => {
        this.emit('click');
        this.scene.sound.play('menu');
      },
      this
    );

    this.scene.add.existing(this);
  }
}

export class BackIcon extends Icon {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'back');
  }
}

export class HeartIcon extends Icon {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'heart');
  }
}

export class SoundIcon extends Icon {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'sound_on');

    this.on(
      'pointerdown',
      () => {
        this.toggle();
      },
      this
    );

    this.scene.add.existing(this);
  }

  mute(mute: boolean) {
    this.scene.sound.mute = mute;
    this.setTexture(mute ? 'sound_off' : 'sound_on');
    return this;
  }

  toggle() {
    const newState = !this.scene.sound.mute;
    this.mute(newState);
    this.emit('toggle', newState);
  }
}
