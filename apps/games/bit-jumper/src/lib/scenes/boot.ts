import { CharityGamesPlugin } from '@worksheets/phaser/plugins';
import Phaser from 'phaser';

import { ProgressBar } from '../objects/loading-bar';
import { Typography } from '../objects/ui/typography';
import { Menu } from './menu';

export class Boot extends Phaser.Scene {
  static readonly KEY = 'boot';
  server: CharityGamesPlugin;
  serverProgress: ProgressBar;
  assetProgress: ProgressBar;
  constructor() {
    super(Boot.KEY);
  }

  preload() {
    this.server = CharityGamesPlugin.find(this);
    this.server.initialize();

    this.createBars();
    this.setLoadEvents();

    const { width, height } = this.cameras.main;

    new Typography(this, width / 2, height * 0.65, 'LOADING');

    this.load.image('dot', './assets/particles/dot.png');
    this.load.image('ring', './assets/particles/ring.png');
    this.load.image('sound_on', './assets/icons/sound_on.png');
    this.load.image('sound_off', './assets/icons/sound_off.png');
    this.load.image('back', './assets/icons/back.png');
    this.load.image('heart', './assets/icons/heart.png');

    this.load.audio('balloon_end', './assets/audio/balloon_end.mp3');
    this.load.audio('balloon_start', './assets/audio/balloon_start.mp3');
    this.load.audio('break', './assets/audio/break.mp3');
    this.load.audio('death', './assets/audio/death.mp3');
    this.load.audio('helicopter_end', './assets/audio/helicopter_end.mp3');
    this.load.audio('helicopter_start', './assets/audio/helicopter_start.mp3');
    this.load.audio('jump', './assets/audio/jump.mp3');
    this.load.audio('menu', './assets/audio/menu.mp3');
    this.load.audio('rocket_end', './assets/audio/rocket_end.mp3');
    this.load.audio('rocket_start', './assets/audio/rocket_start.mp3');
    this.load.audio('smash', './assets/audio/smash.mp3');
    this.load.audio('spring', './assets/audio/spring.mp3');

    this.load.spritesheet(
      'jumper_spritesheet',
      './assets/sprites/infinite_jumper.png',
      {
        frameHeight: 16,
        frameWidth: 16,
      }
    );
  }

  createBars() {
    const { width, height } = this.cameras.main;
    this.assetProgress = new ProgressBar(this, width / 2, height / 2 - 6, {
      height: 8,
      width: width * 0.5,
    });
    this.serverProgress = new ProgressBar(this, width / 2, height / 2 + 6, {
      height: 8,
      width: width * 0.5,
    });
  }

  setLoadEvents() {
    this.load.on(
      'progress',
      (value: number) => {
        this.assetProgress.updateProgress(value);
      },
      this
    );

    this.load.on('complete', () => {
      this.startGame();
    });

    this.server.on('initializing', (value: number) => {
      this.serverProgress.updateProgress(value);
    });

    this.server.on('initialized', () => {
      this.startGame();
    });
  }

  startGame() {
    if (this.server.isInitialized && this.load.isReady()) {
      this.scene.start(Menu.KEY);
    }
  }
}
