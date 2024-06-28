import { CharityGamesPlugin } from '@worksheets/phaser/plugins';

import { createInteractiveButton } from '../buttons/interactive';
import { AUDIO_SETTINGS, GAME_SETTINGS } from '../util/settings';
import { TEXT_STYLE } from '../util/theme';
import { twitterPostIntent } from '../util/twitter';
import TemplateScene from './template';
export default class GameOverScene extends TemplateScene {
  private charityGames!: CharityGamesPlugin;
  private score!: Phaser.GameObjects.Text;
  private value = 0;
  constructor() {
    super('game-over');
  }

  create() {
    super.create();

    const highScore = this.charityGames.storage.get('highScore', 0);
    const { width, height } = this.cameras.main;
    const x = width * 0.5;

    const title = this.add.image(x, height * 0.2, 'text');
    title.setOrigin(0.5);

    const scoreLabel = this.add.text(x, height * 0.375, 'SCORE', TEXT_STYLE);
    scoreLabel.setOrigin(0.5);

    this.score = this.add.text(x, height * 0.435, `${this.value}`, TEXT_STYLE);
    this.score.setOrigin(0.5);

    const bestLabel = this.add.text(x, height * 0.525, 'BEST', TEXT_STYLE);
    bestLabel.setOrigin(0.5);

    const highScoreText = this.add.text(
      x,
      height * 0.585,
      `${highScore}`,
      TEXT_STYLE
    );
    highScoreText.setOrigin(0.5);

    createInteractiveButton(this)(
      width * 0.5,
      height * 0.7,
      'button_play',
      () => {
        this.scene.start('game');
        this.sound.play('click', AUDIO_SETTINGS);
      }
    );

    createInteractiveButton(this)(
      width * 0.5,
      height * 0.8,
      'button_share',
      twitterPostIntent(GAME_SETTINGS, highScore)
    );

    createInteractiveButton(this)(
      width * 0.5,
      height * 0.9,
      'button_exit',
      () => {
        this.sound.play('click', AUDIO_SETTINGS);
        this.scene.start('main');
      }
    );
  }

  async init(value: { score?: number }) {
    this.value = value?.score ?? 0;
    this.charityGames = CharityGamesPlugin.find(this);
    const current = this.charityGames.storage.get('highScore', 0);
    this.charityGames.leaderboard.submit(this.value);
    await submitAchievements(this.charityGames, this.value);
    if (this.value > current) {
      this.charityGames.storage.set('highScore', this.value);
      await this.charityGames.storage.save();
    }
  }
}

const submitAchievements = async (
  charityGames: CharityGamesPlugin,
  score: number
) => {
  await Promise.allSettled([
    charityGames.achievements.unlock('COLOR_RUN_SCORE_1', score >= 1),
    charityGames.achievements.unlock('COLOR_RUN_SCORE_5', score >= 5),
    charityGames.achievements.unlock('COLOR_RUN_SCORE_10', score >= 10),
    charityGames.achievements.unlock('COLOR_RUN_SCORE_25', score >= 25),
    charityGames.achievements.unlock('COLOR_RUN_SCORE_50', score >= 50),
    charityGames.achievements.unlock('COLOR_RUN_SCORE_75', score >= 75),
    charityGames.achievements.unlock('COLOR_RUN_SCORE_100', score >= 100),
  ]);
};
