import { CharityGamesPlugin } from '@worksheets/phaser/plugins';

import { getSoundSetting, saveSoundSetting } from '../data';
import { Button } from './button';

export class SoundButton extends Button {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    { size, scale }: { size: number; scale: number }
  ) {
    const server = CharityGamesPlugin.find(scene);
    const isMuted = getSoundSetting(server);
    scene.sound.setMute(isMuted);

    super(scene, x, y, size, 'green', {
      texture: isMuted ? 'icon_sound_off' : 'icon_sound_on',
      scale,
    });

    this.onClick(() => {
      const isMuted = scene.sound.mute;

      if (isMuted) {
        this.sprite.setTexture('icon_sound_on');
      } else {
        this.sprite.setTexture('icon_sound_off');
      }
      const update = !scene.sound.mute;
      scene.sound.setMute(update);
      saveSoundSetting(server, update);
    });
  }
}
