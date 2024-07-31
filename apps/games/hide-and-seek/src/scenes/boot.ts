import { CharityGamesPlugin } from '@worksheets/phaser/plugins';

import { Building } from '../objects/building';
import { NonPlayerCharacter } from '../objects/non-player-character';
export class Boot extends Phaser.Scene {
  server!: CharityGamesPlugin;
  assetLoadBar!: Phaser.GameObjects.Graphics;
  assetProgressBar!: Phaser.GameObjects.Graphics;

  serverLoadBar!: Phaser.GameObjects.Graphics;
  serverProgressBar!: Phaser.GameObjects.Graphics;
  constructor() {
    super('boot');
  }

  preload() {
    // connect to server
    this.server = CharityGamesPlugin.find(this);
    this.server.initialize();
    this.server.storage.ignore(['targets']);

    // prepare
    this.createBars();
    this.setLoadEvents();
    this.load.image('charity_games', './assets/charity_games.png');

    this.load.image('button_blue_long', 'assets/ui/button_blue_long.png');
    this.load.image('button_grey_long', 'assets/ui/button_grey_long.png');
    this.load.image('cross', 'assets/ui/cross.png');
    this.load.image('check', 'assets/ui/check.png');
    this.load.image('back', 'assets/ui/back.png');
    this.load.image('comfort', 'assets/ui/comfort.png');

    this.load.image('arrow_left', 'assets/ui/arrow_left.png');
    this.load.image('arrow_right', 'assets/ui/arrow_right.png');
    this.load.image('arrow_up', 'assets/ui/arrow_up.png');
    this.load.image('arrow_down', 'assets/ui/arrow_down.png');

    this.load.image('tasks', 'assets/ui/tasks.png');
    this.load.image('siren', 'assets/ui/siren.png');
    this.load.image('population', 'assets/ui/population.png');
    this.load.image('panel_blue', 'assets/ui/panel_blue.png');
    this.load.image('frame_white', 'assets/ui/frame_white.png');
    this.load.image('frame_white_golden', 'assets/ui/frame_white_golden.png');

    this.load.image('pointer_yellow', 'assets/ui/pointer_yellow.png');
    this.load.image('continue', 'assets/ui/continue.png');
    this.load.image('panel_white', 'assets/ui/panel_white.png');
    this.load.image('button_white', 'assets/ui/button_white.png');
    this.load.image('speaker_off', 'assets/ui/speaker_off.png');
    this.load.image('speaker_on', 'assets/ui/speaker_on.png');
    this.load.image('backgrounds', 'assets/tilesets/backgrounds.png');
    this.load.image('furniture', 'assets/tilesets/furniture.png');
    this.load.image('infrastructure', 'assets/tilesets/infrastructure.png');
    this.load.image('objects', 'assets/tilesets/objects.png');
    this.load.image('wallpaper', 'assets/tilesets/wallpaper.png');
    this.load.image('fire', 'assets/tilesets/fire.png');
    this.load.image('gamer', 'assets/tilesets/gamer.png');
    this.load.image('halloween', 'assets/tilesets/halloween.png');
    this.load.image('museum', 'assets/tilesets/museum.png');
    this.load.image('police', 'assets/tilesets/police.png');
    this.load.image('winter', 'assets/tilesets/winter.png');

    this.load.tilemapTiledJSON(Building.MAP_KEY, 'assets/buildings/1.json');

    this.load.spritesheet('elevator', 'assets/spritesheets/elevator.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('door', 'assets/spritesheets/door.png', {
      frameWidth: 16,
      frameHeight: 32,
    });

    this.load.bitmapFont(
      'pixel',
      'assets/fonts/pixel.png',
      'assets/fonts/pixel.xml'
    );
    this.load.bitmapFont(
      'thick',
      'assets/fonts/thick.png',
      'assets/fonts/thick.xml'
    );
    this.load.bitmapFont(
      'peaberry_yellow',
      'assets/fonts/peaberry_yellow.png',
      'assets/fonts/peaberry_yellow.xml'
    );
    this.load.bitmapFont(
      'peaberry_red',
      'assets/fonts/peaberry_red.png',
      'assets/fonts/peaberry_red.xml'
    );
    this.load.bitmapFont(
      'peaberry_blue',
      'assets/fonts/peaberry_blue.png',
      'assets/fonts/peaberry_blue.xml'
    );

    this.load.audio('right', 'assets/sounds/right.mp3');
    this.load.audio('wrong', 'assets/sounds/wrong.mp3');
    this.load.audio('menu', 'assets/sounds/menu.mp3');

    NonPlayerCharacter.preload(this);
  }

  create() {
    this.anims.create({
      key: 'elevator_open',
      frames: this.anims.generateFrameNumbers('elevator', {
        start: 0,
        end: 4,
      }),
      frameRate: 6,
    });

    this.anims.create({
      key: 'elevator_close',
      frames: this.anims.generateFrameNumbers('elevator', {
        start: 5,
        end: 9,
      }),
      frameRate: 6,
    });

    this.anims.create({
      key: 'door_open',
      frames: this.anims.generateFrameNumbers('door', {
        start: 0,
        end: 3,
      }),
      frameRate: 6,
    });

    this.anims.create({
      key: 'door_close',
      frames: this.anims.generateFrameNumbers('door', {
        start: 4,
        end: 7,
      }),
      frameRate: 6,
    });
    NonPlayerCharacter.create(this);
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

  startGame() {
    if (this.server.isInitialized && this.load.isReady()) {
      this.scene.start('game');
    }
  }
}
