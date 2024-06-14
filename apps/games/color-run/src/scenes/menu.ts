import { CharityGamesPlugin } from '@worksheets/phaser/plugins';

import { createInteractiveButton } from '../buttons/interactive';
import { AUDIO_SETTINGS, GAME_SETTINGS } from '../util/settings';
import { TEXT_STYLE } from '../util/theme';
import { twitterPostIntent } from '../util/twitter';
import TemplateScene from './template';

export default class MainScene extends TemplateScene {
  constructor() {
    super('main');
  }

  preload() {
    super.preload();

    this.load.image('button_play', './assets/sprites/button/play.png');
    this.load.image('button_share', './assets/sprites/button/share.png');
    this.load.image('title_text', './assets/sprites/title/text.png');
    this.load.image('title_logo', './assets/sprites/title/logo.png');
    this.load.image('cursor', './assets/cursor/black.png');
    this.load.audio('click', './assets/audio/click.ogg');
  }

  create() {
    super.create();

    const charityGames = CharityGamesPlugin.find(this);
    const highScore = charityGames.storage.get('highScore', 0);

    const { width, height } = this.cameras.main;

    this.add.image(width * 0.5, height * 0.3, 'title_text');
    this.add.image(width * 0.5, height * 0.5, 'title_logo');

    createInteractiveButton(this)(
      width * 0.5,
      height * 0.65,
      'button_play',
      () => {
        this.scene.start('game');
        this.sound.play('click', AUDIO_SETTINGS);
      }
    );

    createInteractiveButton(this)(
      width * 0.5,
      height * 0.75,
      'button_share',
      twitterPostIntent(GAME_SETTINGS, highScore)
    );

    this.add
      .text(width * 0.5, height * 0.85, `Best: ${highScore}`, TEXT_STYLE)
      .setOrigin(0.5);
  }
}
