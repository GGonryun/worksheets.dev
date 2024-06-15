import { CharityGamesPlugin } from '@worksheets/phaser/plugins';

import { TEXT_STYLE } from '../util/theme';
import { setWallpaper } from '../util/wallpaper';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('boot');
  }

  preload() {
    this.load.image('wallpaper', './assets/sprites/wallpaper/white.png');
    this.load.image('charity-games-logo', './assets/logos/charity-games.png');
  }

  async create() {
    setWallpaper(this)('wallpaper');

    const { width, height } = this.cameras.main;
    // place charity-games-logo in the center of the screen
    const logo = this.add.image(
      width * 0.5,
      height * 0.4,
      'charity-games-logo'
    );
    logo.setDisplaySize(256, 256);
    logo.setOrigin(0.5);

    // the logo should pulse like a beating heart
    this.tweens.add({
      targets: logo,
      scale: 0.1,
      duration: 500,
      yoyo: true,
      repeat: -1,
    });

    // display text to show that the game is connecting to the charity games platform
    const text = this.add
      .text(
        width * 0.5,
        height * 0.6,
        'Connecting to Charity Games...',
        // text should wrap
        {
          ...TEXT_STYLE,
          wordWrap: { width: width * 0.8 },
        }
      )
      .setOrigin(0.5);

    const charityGames: CharityGamesPlugin = CharityGamesPlugin.find(this);
    // check what host i'm on
    const host = window.location.host;
    if (host !== 'cdn.charity.games') {
      console.warn('Not on charity.games, skipping session start');
      this.scene.start('main');
      return;
    }

    try {
      await charityGames.session.start();
      // change the text to show that the game is loading
      text.setText('Loading storage...');
      await charityGames.storage.load();
      // wait for 1 second before starting the main scene
      this.scene.start('main');
    } catch {
      this.scene.start('main');
    }
  }
}
