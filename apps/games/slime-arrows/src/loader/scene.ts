import { CharityGamesPlugin } from '@worksheets/phaser/plugins';

import { BASE_TEXT_PROPS } from '../game/gui';
import { GameScene } from '../game/scene';
import { GAME_HEIGHT, GAME_WIDTH } from '../main';

export class LoaderScene extends Phaser.Scene {
  static KEY = 'Loader';
  server: CharityGamesPlugin;
  constructor() {
    super(LoaderScene.KEY);
  }
  init() {
    //  A simple progress bar. This is the outline of the bar.
    this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

    //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
    const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

    //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
    this.load.on('progress', (progress: number) => {
      //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
      bar.width = 4 + 460 * progress;
    });
  }

  preload() {
    this.server = CharityGamesPlugin.find(this);
    this.server.initialize();

    this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'Loading...', BASE_TEXT_PROPS())
      .setOrigin(0.5, 0.5);

    this.load.setPath('assets');

    this.load.image('hand', 'hand.png');

    this.load.spritesheet('slime-idle', 'slime-idle.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet('slime-walk', 'slime-walk.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet('slime-die', 'slime-die.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet('bow-and-arrow', 'bow-and-arrow.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet('dirt', 'dirt.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet('grass', 'grass.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet('lumps', 'lumps.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet('gui', 'gui.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet('joystick', 'joystick.png', {
      frameWidth: 18,
      frameHeight: 18,
    });

    this.load.image('icon-heart', 'icon-heart.png');
    this.load.image('icon-map', 'icon-map.png');
    this.load.image('icon-question', 'icon-question.png');
    this.load.image('icon-reset', 'icon-reset.png');
    this.load.image('icon-time', 'icon-time.png');
    this.load.image('icon-star', 'icon-star.png');
    this.load.image('icon-itch', 'icon-itch.png');
    this.load.image('icon-charity-games', 'icon-charity-games.png');
    this.load.image('icon-sound-on', 'icon-sound-on.png');
    this.load.image('icon-sound-off', 'icon-sound-off.png');

    this.load.audio('bgm', 'audio/bgm.wav');
    this.load.audio('arrow', 'audio/arrow.wav');
    this.load.audio('bow', 'audio/bow.wav');
    this.load.audio('click', 'audio/click.wav');
    this.load.audio('hit', 'audio/hit.wav');
    this.load.audio('die', 'audio/die.wav');

    this.load.on('complete', () => {
      this.startGame();
    });
    this.server.on('initialized', () => {
      this.startGame();
    });
  }

  startGame() {
    if (this.server.isInitialized && this.load.isReady()) {
      this.scene.start(GameScene.KEY);
    }
  }
}
