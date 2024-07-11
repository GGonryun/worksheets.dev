import { CharityGamesPlugin } from '@worksheets/phaser/plugins';

export class Boot extends Phaser.Scene {
  assetLoadBar!: Phaser.GameObjects.Graphics;
  assetProgressBar!: Phaser.GameObjects.Graphics;

  serverLoadBar!: Phaser.GameObjects.Graphics;
  serverProgressBar!: Phaser.GameObjects.Graphics;

  server!: CharityGamesPlugin;
  constructor() {
    super('boot');
  }

  preload() {
    // connect to server
    this.server = CharityGamesPlugin.find(this);
    this.server.initialize();

    // prepare
    this.createBars();
    this.setLoadEvents();

    // load assets
    this.load.image('charity_games', './assets/charity_games.png');

    this.load.image('icon_play', './assets/icon_play.png');
    this.load.image('icon_sound_on', './assets/icon_sound_on.png');
    this.load.image('icon_sound_off', './assets/icon_sound_off.png');
    this.load.image('icon_look_on', './assets/icon_look_on.png');
    this.load.image('icon_look_off', './assets/icon_look_off.png');
    this.load.image('icon_exit', './assets/icon_exit.png');
    this.load.image('icon_stats', './assets/icon_stats.png');
    this.load.image('icon_return', './assets/icon_return.png');
    this.load.image('icon_home', './assets/icon_home.png');
    this.load.image('icon_cancel', './assets/icon_cancel.png');
    this.load.image('icon_lightning', './assets/icon_lightning.png');
    this.load.image('icon_square', './assets/icon_square.png');
    this.load.image('icon_ad', './assets/icon_ad.png');
    this.load.image('icon_dot', './assets/icon_dot.png');
    this.load.image('icon_star', './assets/icon_star.png');

    this.load.audio('select', './assets/select.wav');
    this.load.audio('game_over', './assets/game_over.wav');
    this.load.audio('collect_small', './assets/collect_small.wav');
    this.load.audio('collect_large', './assets/collect_large.wav');
    this.load.audio('text', './assets/text.wav');
    this.load.audio('confirm', './assets/confirm.wav');
    this.load.audio('cancel', './assets/cancel.wav');
    this.load.audio('click', './assets/click.wav');
    this.load.audio('last_chance', './assets/last_chance.wav');
    this.load.audio('thunder', './assets/thunder.wav');

    // other
    this.sound.volume = 0.35;
  }

  setLoadEvents() {
    this.load.on(
      'progress',
      (value: number) => {
        this.assetProgressBar.clear();
        this.assetProgressBar.fillStyle(0x0088aa, 1);
        this.assetProgressBar.fillRect(
          this.cameras.main.width / 4,
          this.cameras.main.height * 0.5 - 16,
          (this.cameras.main.width / 2) * value,
          16
        );
      },
      this
    );

    this.load.on('complete', () => {
      this.startGame();
    });

    this.server.on('initializing', (value: number) => {
      this.serverProgressBar.clear();
      this.serverProgressBar.fillStyle(0x0088aa, 1);
      this.serverProgressBar.fillRect(
        this.cameras.main.width / 4,
        this.cameras.main.height * 0.5 + 10,
        (this.cameras.main.width / 2) * value,
        16
      );
    });

    this.server.on('initialized', () => {
      this.startGame();
    });
  }

  create() {
    const { width, height } = this.cameras.main;
    const logo = this.add
      .sprite(width * 0.5, height * 0.4, 'charity_games')
      .setOrigin(0.5);

    this.tweens.add({
      targets: logo,
      scale: { from: 0.08, to: 0.04 },
      duration: 500,
      yoyo: true,
      repeat: -1,
    });

    this.add
      .text(width * 0.5, height * 0.55, 'Loading...')
      .setOrigin(0.5)
      .setAlign('center');
  }

  startGame() {
    if (this.server.isInitialized && this.load.isReady()) {
      this.scene.start('main');
    }
  }

  createBars() {
    this.assetLoadBar = this.add.graphics();
    this.assetLoadBar.fillStyle(0xd40000, 1);
    this.assetLoadBar.fillRect(
      this.cameras.main.width / 4 - 2,
      this.cameras.main.height * 0.5 - 18,
      this.cameras.main.width / 2 + 4,
      20
    );
    this.assetProgressBar = this.add.graphics();

    this.serverLoadBar = this.add.graphics();
    this.serverLoadBar.fillStyle(0xd40000, 1);
    this.serverLoadBar.fillRect(
      this.cameras.main.width / 4 - 2,
      this.cameras.main.height * 0.5 + 8,
      this.cameras.main.width / 2 + 4,
      20
    );
    this.serverProgressBar = this.add.graphics();
    this.serverProgressBar.fillStyle(0x0088aa, 1);
    this.serverProgressBar.fillRect(
      this.cameras.main.width / 4,
      this.cameras.main.height * 0.5 + 10,
      (this.cameras.main.width / 2) * 0.05,
      16
    );
  }
}
