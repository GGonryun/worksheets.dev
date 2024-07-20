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
    this.server.storage.ignore(['bonus-run']);

    // prepare
    this.addBars();
    this.addEvents();
    this.load.audio('select', 'assets/audio/select.mp3');
    this.load.audio('drop', 'assets/audio/drop.mp3');
    this.load.audio('victory', 'assets/audio/victory.mp3');
    this.load.audio('over', 'assets/audio/over.mp3');
    this.load.audio('success_1', 'assets/audio/success_1.mp3');
    this.load.audio('success_2', 'assets/audio/success_2.mp3');

    this.load.image('charity_games', 'assets/logos/charity_games.png');

    this.load.image('block', 'assets/sprites/block.png');
    this.load.image('border', 'assets/sprites/border.png');
    this.load.image('grid', 'assets/sprites/grid.png');
    this.load.image('wallpaper', 'assets/sprites/wallpaper.png');
    this.load.image('arrow_up', 'assets/sprites/arrow_up.png');
    this.load.image('blue_gem', 'assets/sprites/blue_gem.png');
    this.load.image('dollar', 'assets/sprites/dollar.png');

    this.load.image('ui_home', 'assets/ui/home.png');
    this.load.image('ui_play', 'assets/ui/play.png');
    this.load.image('ui_star', 'assets/ui/star.png');
    this.load.image('ui_speaker_on', 'assets/ui/speaker_on.png');
    this.load.image('ui_speaker_off', 'assets/ui/speaker_off.png');
    this.load.image('ui_question', 'assets/ui/question.png');

    this.load.spritesheet('coin', 'assets/sprites/coin.png', {
      frameWidth: 16,
      frameHeight: 14,
    });

    this.load.spritesheet('chest', 'assets/sprites/chest.png', {
      frameWidth: 16,
      frameHeight: 18,
    });

    this.load.bitmapFont(
      'peaberry',
      'assets/fonts/peaberry.png',
      'assets/fonts/peaberry.xml'
    );

    this.sound.volume = 0.5;
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

  addBars() {
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

  startGame() {
    if (this.server.isInitialized && this.load.isReady()) {
      this.createAnimations();
      this.scene.start('menu');
    }
  }

  addEvents() {
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

  createAnimations() {
    this.anims.create({
      key: 'coin',
      frames: this.anims.generateFrameNumbers('coin', {
        start: 0,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'chest',
      frames: this.anims.generateFrameNumbers('chest', {
        start: 0,
        end: 3,
      }),
      frameRate: 12,
    });
  }
}
