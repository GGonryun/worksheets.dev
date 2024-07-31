import { CharityGamesPlugin } from '@worksheets/phaser/plugins';

export class VolumeButton extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    const server = CharityGamesPlugin.find(scene);
    const muted = server.storage.get('muted', false);
    scene.sound.mute = muted;

    const icon = scene.add
      .sprite(0, -1, scene.sound.mute ? 'speaker_off' : 'speaker_on')
      .setScale(1);

    const button = scene.add
      .sprite(0, 0, 'button_white')
      .setScale(1.1)
      .setInteractive()
      .on(
        'pointerdown',
        (
          _p: unknown,
          _x: unknown,
          _y: unknown,
          e: Phaser.Types.Input.EventData
        ) => {
          server.storage.set('muted', !scene.sound.mute);
          scene.sound.mute = !scene.sound.mute;
          icon.setTexture(scene.sound.mute ? 'speaker_on' : 'speaker_off');
          scene.sound.play('menu');
          server.storage.save();
          e.stopPropagation();
        }
      );

    this.add(button);
    this.add(icon);
    scene.add.existing(this);
  }
}
