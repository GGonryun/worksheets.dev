import { CharityGamesPlugin } from '@worksheets/phaser/plugins';

import { setWallpaper } from '../util/wallpaper';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('boot');
  }

  preload() {
    this.load.image('wallpaper', './assets/sprites/wallpaper/white.png');
  }

  async create() {
    setWallpaper(this)('wallpaper');

    const charityGames: CharityGamesPlugin = CharityGamesPlugin.find(this);
    try {
      await charityGames.session.start();
      await charityGames.storage.load();
      this.scene.start('main');
    } catch {
      this.scene.start('main');
    }
  }
}
