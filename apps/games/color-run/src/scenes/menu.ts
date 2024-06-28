import { CharityGamesPlugin } from '@worksheets/phaser/plugins';

import { createInteractiveButton } from '../buttons/interactive';
import { AUDIO_SETTINGS, GAME_SETTINGS } from '../util/settings';
import { TEXT_STYLE, theme } from '../util/theme';
import { twitterPostIntent } from '../util/twitter';
import TemplateScene from './template';

export default class MainScene extends TemplateScene {
  constructor() {
    super('main');
  }

  create() {
    super.create();

    const charityGames = CharityGamesPlugin.find(this);
    const highScore = charityGames.storage.get('highScore', 0);

    const { width, height } = this.cameras.main;

    this.add.image(width * 0.5, height * 0.3, 'title_text');
    this.add.image(width * 0.5, height * 0.5, 'title_logo');
    this.add
      .text(width * 0.07, height * 0.97, 'v1.3', {
        font: 'bold 18px Arial',
        color: theme.red,
      })
      .setOrigin(0.5);

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
