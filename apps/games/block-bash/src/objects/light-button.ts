import { CharityGamesPlugin } from '@worksheets/phaser/plugins';

import { getThemeSetting, saveThemeSetting } from '../data';
import { theme } from '../settings';
import { Button } from './button';

export class LightButton extends Button {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    {
      size,
      scale,
    }: {
      size: number;
      scale: number;
    }
  ) {
    const server = CharityGamesPlugin.find(scene);
    const key = getThemeSetting(server);
    super(scene, x, y, size, 'yellow', {
      texture: key === 'light' ? 'icon_look_on' : 'icon_look_off',
      scale,
    });
    this.onClick(() => {
      const key = theme.get().key;
      if (key === 'light') {
        theme.set('dark');
        this.sprite.setTexture('icon_look_off');
      } else {
        theme.set('light');
        this.sprite.setTexture('icon_look_on');
      }

      saveThemeSetting(server, theme.get().key);
    });
  }
}
