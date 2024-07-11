import { CharityGamesPlugin } from '@worksheets/phaser/plugins';

import { BEST_KEY, BLOCKS_KEY, GAMES_KEY, LINES_KEY, SCORE_KEY } from '../data';
import { LabeledButton } from '../objects/labeled-button';
import { Typography } from '../objects/typography';
import { GameOverPayload } from '../types';

export class GameOver extends Phaser.Scene {
  payload: GameOverPayload;
  best: number;
  constructor() {
    super('game-over');
    this.best = 0;
    this.payload = {
      score: 0,
      blocks: 0,
      lines: 0,
    };
  }

  init(payload: GameOverPayload) {
    this.payload = payload;
  }

  notifyServer() {
    const server = CharityGamesPlugin.find(this);

    const best = server.storage.get(BEST_KEY, 0);
    this.best = best;
    const score = server.storage.get(SCORE_KEY, 0);
    const lines = server.storage.get(LINES_KEY, 0);
    const games = server.storage.get(GAMES_KEY, 0);
    const blocks = server.storage.get(BLOCKS_KEY, 0);

    if (this.payload.score > best) {
      server.storage.set(BEST_KEY, this.payload.score);
    }
    const newScore = score + this.payload.score;
    const newLines = lines + this.payload.lines;
    const newBlocks = blocks + this.payload.blocks;
    const newGames = games + 1;
    server.storage.set(SCORE_KEY, newScore);
    server.storage.set(LINES_KEY, newLines);
    server.storage.set(BLOCKS_KEY, newBlocks);
    server.storage.set(GAMES_KEY, newGames);

    server.storage.save();

    server.leaderboard.submit(this.payload.score);

    this.updateAchievements({
      server,
      newLines,
      newBlocks,
    });
  }

  updateAchievements({
    server,
    newLines,
    newBlocks,
  }: {
    server: CharityGamesPlugin;
    newLines: number;
    newBlocks: number;
  }) {
    const achievements: string[] = [];

    // solo game achievements
    this.payload.score >= 100 &&
      achievements.push('BLOCK_BASH_100_POINTS_GAME');
    this.payload.score >= 500 &&
      achievements.push('BLOCK_BASH_500_POINTS_GAME');
    this.payload.score >= 1000 &&
      achievements.push('BLOCK_BASH_1000_POINTS_GAME');
    this.payload.score >= 1500 &&
      achievements.push('BLOCK_BASH_1500_POINTS_GAME');
    this.payload.score >= 2000 &&
      achievements.push('BLOCK_BASH_2000_POINTS_GAME');
    this.payload.score >= 3000 &&
      achievements.push('BLOCK_BASH_3000_POINTS_GAME');
    this.payload.score >= 4000 &&
      achievements.push('BLOCK_BASH_4000_POINTS_GAME');
    this.payload.score >= 5000 &&
      achievements.push('BLOCK_BASH_5000_POINTS_GAME');

    // lines achievements
    newLines >= 100 && achievements.push('BLOCK_BASH_100_LINES_LIFETIME');
    newLines >= 500 && achievements.push('BLOCK_BASH_500_LINES_LIFETIME');
    newLines >= 1000 && achievements.push('BLOCK_BASH_1000_LINES_LIFETIME');
    newLines >= 2500 && achievements.push('BLOCK_BASH_2500_LINES_LIFETIME');
    newLines >= 5000 && achievements.push('BLOCK_BASH_5000_LINES_LIFETIME');
    newLines >= 10000 && achievements.push('BLOCK_BASH_10000_LINES_LIFETIME');

    // blocks achievements
    newBlocks >= 1000 && achievements.push('BLOCK_BASH_1000_BLOCKS_LIFETIME');
    newBlocks >= 5000 && achievements.push('BLOCK_BASH_5000_BLOCKS_LIFETIME');
    newBlocks >= 10000 && achievements.push('BLOCK_BASH_10000_BLOCKS_LIFETIME');
    newBlocks >= 20000 && achievements.push('BLOCK_BASH_20000_BLOCKS_LIFETIME');
    newBlocks >= 50000 && achievements.push('BLOCK_BASH_50000_BLOCKS_LIFETIME');
    newBlocks >= 100000 &&
      achievements.push('BLOCK_BASH_100000_BLOCKS_LIFETIME');

    server.achievements.unlock(achievements);
  }

  create() {
    this.notifyServer();
    const { width, height } = this.cameras.main;
    const { score } = this.payload;
    const BEST_SCORE = this.best;
    new Typography(this, width * 0.5, height * 0.15, 'GAME OVER!', 64);

    new Typography(this, width * 0.5, height * 0.3, 'Score:', 48);
    new Typography(this, width * 0.5, height * 0.35, `${score}`, 48);

    this.add.sprite(width * 0.5, height * 0.44, 'icon_star').setScale(0.25);
    new Typography(this, width * 0.5, height * 0.5, 'Best:', 48);
    new Typography(this, width * 0.5, height * 0.55, `${BEST_SCORE}`, 48);

    new LabeledButton(this, {
      icon: 'icon_home',
      label: 'Main Menu',
    })
      .setPosition(width * 0.3, height * 0.7)
      .onClick(() => {
        this.scene.stop('game');
        this.scene.start('main');
      });

    new LabeledButton(this, {
      icon: 'icon_return',
      label: 'Try Again',
    })
      .setPosition(width * 0.3, height * 0.8)
      .onClick(() => {
        this.scene.start('game');
      });
  }
}
