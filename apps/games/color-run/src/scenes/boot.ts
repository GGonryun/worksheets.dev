import { CharityGamesPlugin } from '@worksheets/phaser/plugins';

import { TEXT_STYLE } from '../util/theme';
import { setWallpaper } from '../util/wallpaper';

const isValidHost = () => {
  if (process.env.NODE_ENV === 'development') {
    return true;
  }
  return window.location.host === 'cdn.charity.games';
};
export default class BootScene extends Phaser.Scene {
  loadBar!: Phaser.GameObjects.Graphics;
  progressBar!: Phaser.GameObjects.Graphics;
  constructor() {
    super('boot');
  }

  preload() {
    this.createBars();
    this.setLoadEvents();
    this.load.image('charity-games-logo', './assets/logos/charity-games.png');
    this.load.image('instructions', './assets/sprites/game/help.png');
    this.load.image('button_share', './assets/sprites/button/share.png');
    this.load.image('button_play', './assets/sprites/button/play.png');
    this.load.image('button_exit', './assets/sprites/button/exit.png');
    this.load.image('ball_orange', './assets/sprites/game/ball_orange.png');
    this.load.image('title_text', './assets/sprites/title/text.png');
    this.load.image('title_logo', './assets/sprites/title/logo.png');
    this.load.image('wallpaper', './assets/sprites/wallpaper/white.png');
    this.load.image('ball_red', './assets/sprites/game/ball_red.png');
    this.load.audio('collect', './assets/audio/collect.wav');
    this.load.audio('start', './assets/audio/start.wav');
    this.load.audio('death', './assets/audio/death.wav');
    this.load.audio('click', './assets/audio/click.wav');
    this.load.image('text', './assets/sprites/title/text.png');
    this.load.image('tap', './assets/sprites/game/tap.png');
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
    if (!isValidHost()) {
      console.warn('Not on charity.games, skipping session start');
      this.scene.start('main');
      return;
    }

    charityGames.on('initializing', (o) => {
      text.setText(`Initializing: ${o * 100}%`);
    });

    charityGames.on('initialized', () => {
      this.scene.start('main');
    });

    charityGames.initialize();
  }

  setLoadEvents() {
    this.load.on(
      'progress',
      (value: number) => {
        this.progressBar.clear();
        this.progressBar.fillStyle(0x0088aa, 1);
        this.progressBar.fillRect(
          this.cameras.main.width / 4,
          this.cameras.main.height / 2 - 16,
          (this.cameras.main.width / 2) * value,
          16
        );
      },
      this
    );
    this;
    30;
  }

  createBars() {
    this.loadBar = this.add.graphics();
    this.loadBar.fillStyle(0xd40000, 1);
    this.loadBar.fillRect(
      this.cameras.main.width / 4 - 2,
      this.cameras.main.height / 2 - 18,
      this.cameras.main.width / 2 + 4,
      20
    );
    this.progressBar = this.add.graphics();
  }
}
