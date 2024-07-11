import { LabeledButton } from '../objects/labeled-button';
import { Typography } from '../objects/typography';
import { tomato } from '../settings';

export class AreYouSure extends Phaser.Scene {
  constructor() {
    super('are-you-sure');
  }

  create() {
    // create a giant square that covers the screen
    const { width, height } = this.cameras.main;
    const graphic = this.add.graphics();
    graphic.fillStyle(0x000000, 0.0);
    graphic.fillRect(0, 0, width, height);
    graphic.setInteractive(
      new Phaser.Geom.Rectangle(0, 0, width, height),
      Phaser.Geom.Rectangle.Contains
    );

    // display two buttons
    new Typography(this, width * 0.5, height * 0.29, 'Are you sure?', 48);

    const handleCancel = () => {
      this.scene.get('game').scene.resume();
      this.scene.sleep();
    };
    const handleConfirm = () => {
      this.scene.stop('game');
      this.scene.start('main');
    };

    new LabeledButton(this, {
      icon: 'icon_cancel',
      label: 'Cancel',
      sound: 'confirm',
    })
      .onClick(handleCancel)
      .setPosition(width * 0.3, height * 0.4);

    new LabeledButton(this, {
      icon: 'icon_exit',
      label: 'Exit',
      sound: 'cancel',
    })
      .onClick(handleConfirm)
      .setPosition(width * 0.3, height * 0.5);

    new Typography(
      this,
      width * 0.5,
      height * 0.6,
      'You will forfeit all progress!',
      24,
      tomato
    );
  }
}
