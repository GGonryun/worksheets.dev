import { CharityGamesPlugin } from '@worksheets/phaser/plugins';

import {
  CHARACTER,
  CHARACTER_KEYS_ARRAY,
  CharacterKey,
} from '../data/characters';

export class Boot extends Phaser.Scene {
  loadBar!: Phaser.GameObjects.Graphics;
  progressBar!: Phaser.GameObjects.Graphics;
  constructor() {
    super('boot');
  }

  preload() {
    this.createBars();
    this.setLoadEvents();
    this.load.image('charity-games-logo', './assets/logos/charity-games.png');
    this.load.audio('coin', './assets/sounds/coin.mp3');
    this.load.audio('jump', './assets/sounds/jump.mp3');
    this.load.audio('dead', './assets/sounds/dead.mp3');
    this.load.audio('buzz', './assets/sounds/buzz.mp3');
    this.load.audio('select', './assets/sounds/select.mp3');
    this.load.audio('unlock', './assets/sounds/unlock.mp3');
    this.load.audio('damage', './assets/sounds/damage.mp3');

    this.load.image('icon_check', './assets/images/icon_check.png');
    this.load.image(
      'button_arrow_left',
      './assets/images/button_arrow_left.png'
    );
    this.load.image('button_star', './assets/images/button_star.png');
    this.load.image('button_video', './assets/images/button_video.png');
    this.load.image('button_play', './assets/images/button_play.png');
    this.load.image('button_main_menu', './assets/images/button_main_menu.png');
    this.load.image('button_shop', './assets/images/button_shop.png');
    this.load.image('button_music_on', './assets/images/button_music_on.png');
    this.load.image('button_music_off', './assets/images/button_music_off.png');
    this.load.image('button_check', './assets/images/button_check.png');
    this.load.image(
      'icon_charity_games',
      './assets/images/icon_charity_games.png'
    );
    this.load.image('button_unlock', './assets/images/button_unlock.png');
    this.load.image('cloud', './assets/images/cloud.png');
    this.load.image('bg_1', './assets/images/bg_1.png');
    this.load.image('bg_2', './assets/images/bg_2.png');
    this.load.image('bg_3', './assets/images/bg_3.png');
    this.load.image('floor_1', './assets/images/floor_1.png');
    this.load.image('cactus_md', './assets/images/cactus_md.png');
    this.load.image('cactus_md_x2', './assets/images/cactus_md_x2.png');
    this.load.image('cactus_md_x3', './assets/images/cactus_md_x3.png');
    this.load.image('cactus_sm', './assets/images/cactus_sm.png');
    this.load.image('cactus_sm_x2', './assets/images/cactus_sm_x2.png');
    this.load.image('cactus_lg', './assets/images/cactus_lg.png');
    this.load.image('ui_cursor_down', './assets/images/ui_cursor_down.png');
    this.load.image('icon_life', './assets/images/icon_life.png');
    this.load.image('icon_life_lost', './assets/images/icon_life_lost.png');

    this.load.spritesheet('coin', './assets/images/coin.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('dust', './assets/images/dust.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    CHARACTER_KEYS_ARRAY.forEach((key) => {
      this.loadCharacterSpritesheet(key);
    });

    this.load.bitmapFont(
      'arcade',
      './assets/fonts/arcade.png',
      './assets/fonts/arcade.xml'
    );
  }

  async create() {
    this.createAnimations();

    await this.connectToServer();
  }

  loadCharacterSpritesheet(key: CharacterKey) {
    const character = CHARACTER[key];
    const run = character.sprites.run.key;
    const idle = character.sprites.idle.key;
    const height = character.sprites.height;

    this.load.spritesheet(run, `./assets/images/${run}.png`, {
      frameWidth: 32,
      frameHeight: height,
    });
    this.load.spritesheet(idle, `./assets/images/${idle}.png`, {
      frameWidth: 32,
      frameHeight: height,
    });
  }

  setLoadEvents() {
    this.load.on(
      'progress',
      (value: number) => {
        this.progressBar.clear();
        this.progressBar.fillStyle(0x0088aa, 1);
        this.progressBar.fillRect(
          this.cameras.main.width / 4,
          this.cameras.main.height / 2 - 4,
          (this.cameras.main.width / 2) * value * 1,
          16
        );
      },
      this
    );
  }

  createBars() {
    this.loadBar = this.add.graphics();
    this.loadBar.fillStyle(0xd40000, 1);
    this.loadBar.fillRect(
      this.cameras.main.width / 4 - 2,
      this.cameras.main.height / 2 - 6,
      this.cameras.main.width / 2 + 4,
      20
    );
    this.progressBar = this.add.graphics();
  }

  createAnimations() {
    if (!this.anims.exists('coin')) {
      this.anims.create({
        key: 'coin',
        frames: this.anims.generateFrameNumbers('coin', {
          start: 0,
          end: 7,
        }),
        frameRate: 8,
      });
    }

    CHARACTER_KEYS_ARRAY.forEach((key) => {
      this.createPlayerAnimation(key);
    });
  }
  createPlayerAnimation(key: CharacterKey) {
    const character = CHARACTER[key];
    const run = character.sprites.run;
    const idle = character.sprites.idle;

    if (!this.anims.exists(run.key)) {
      this.anims.create({
        key: run.key,
        frames: this.anims.generateFrameNumbers(run.key, {
          start: 0,
          end: run.frames - 1,
        }),
        frameRate: 20,
      });
    }
    if (!this.anims.exists(idle.key)) {
      this.anims.create({
        key: idle.key,
        frames: this.anims.generateFrameNumbers(idle.key, {
          start: 0,
          end: idle.frames - 1,
        }),
        frameRate: 12,
      });
    }
  }
  async connectToServer() {
    const { width, height } = this.cameras.main;

    const logo = this.add
      .image(width * 0.5, height * 0.25, 'charity-games-logo')
      .setOrigin(0.5);

    this.tweens.add({
      targets: logo,
      scale: { from: 0.015, to: 0.03 },
      duration: 500,
      yoyo: true,
      repeat: -1,
    });

    const text = this.add
      .text(
        width * 0.5,
        height * 0.75,
        'Connecting to Charity Games...',
        // text should wrap
        {
          wordWrap: { width: width * 0.8 },
        }
      )
      .setOrigin(0.5)
      .setAlign('center');

    const charityGames: CharityGamesPlugin = CharityGamesPlugin.find(this);

    charityGames.on('initializing', (o) => {
      text.setText(`Initializing: ${o * 100}%`);
    });

    charityGames.on('initialized', () => {
      this.scene.start('menu');
    });

    charityGames.initialize();
  }
}
