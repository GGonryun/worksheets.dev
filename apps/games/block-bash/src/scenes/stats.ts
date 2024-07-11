import { CharityGamesPlugin } from '@worksheets/phaser/plugins';

import { BLOCKS_KEY, GAMES_KEY, LINES_KEY, SCORE_KEY } from '../data';
import { Button } from '../objects/button';
import { Typography } from '../objects/typography';
import { theme, version } from '../settings';

export class Stats extends Phaser.Scene {
  constructor() {
    super('stats');
  }

  create() {
    this.cameras.main.setBackgroundColor(theme.get().background);

    this.createTitle();
    this.createStats();
    this.createBackButton();
    this.createCredits();
  }

  createTitle() {
    const { width, height } = this.cameras.main;

    this.add
      .text(width * 0.5, height * 0.1, 'Statistics', {
        fontFamily: 'gluten',
        color: theme.get().text,
        fontSize: '64px',
      })
      .setOrigin(0.5)
      .setStroke('#000000', 8);
  }

  createStats() {
    const server = CharityGamesPlugin.find(this);

    const LIFETIME_SCORE = server.storage.get(SCORE_KEY, 0);
    const LINES_COMPLETED = server.storage.get(LINES_KEY, 0);
    const GAMES_PLAYED = server.storage.get(GAMES_KEY, 0);
    const BLOCKS_PLACED = server.storage.get(BLOCKS_KEY, 0);

    const { width, height } = this.cameras.main;

    new Typography(
      this,
      width * 0.5,
      height * 0.4,
      `Lines Completed: ${LINES_COMPLETED}`,
      32
    ).setOrigin(0.5);

    new Typography(
      this,
      width * 0.5,
      height * 0.45,
      `Blocks Placed: ${BLOCKS_PLACED}`,
      32
    ).setOrigin(0.5);

    new Typography(
      this,
      width * 0.5,
      height * 0.5,
      `Points Earned: ${LIFETIME_SCORE}`,
      32
    ).setOrigin(0.5);

    new Typography(
      this,
      width * 0.5,
      height * 0.55,
      `Games Played: ${GAMES_PLAYED}`,
      32
    ).setOrigin(0.5);
  }

  createBackButton() {
    new Button(this, 24, 72, 48, 'blue', {
      texture: 'icon_return',
      scale: 0.15,
      sound: 'cancel',
    }).onClick(() => {
      this.scene.start('main');
    });
  }

  createCredits() {
    const { width, height } = this.cameras.main;
    new Typography(this, width * 0.25, height * 0.9, 'Created with', 24);
    new Typography(this, width * 0.7, height * 0.9, 'by Charity Games', 24);
    new Typography(this, width * 0.5, height * 0.98, `Version: ${version}`, 16);

    this.add
      .sprite(width * 0.5 - 28, height * 0.9, 'charity_games')
      .setScale(0.5)
      .setScale(0.03);
  }
}
