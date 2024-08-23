import { CharityGamesPlugin } from '@worksheets/phaser/plugins';

import { StorageKey } from '../data';
import { Enemies } from '../objects/enemies';
import { Button } from '../objects/ui/button';
import { Typography } from '../objects/ui/typography';
import { GameOverPayload } from '../types';
import { Menu } from './menu';
import { Play } from './play';

export class End extends Phaser.Scene {
  static readonly KEY = 'end';
  payload: GameOverPayload;
  server: CharityGamesPlugin;

  constructor() {
    super(End.KEY);
  }

  init(payload: GameOverPayload) {
    this.payload = payload;
    this.server = CharityGamesPlugin.find(this);
  }

  create() {
    const { width, height } = this.cameras.main;
    const highScore = Math.max(
      this.payload.score,
      this.server.storage.get(StorageKey.HIGH_SCORE, 0)
    );

    this.server.storage.set(StorageKey.HIGH_SCORE, highScore);

    new Typography(this, width * 0.5, 25, 'GAME\nOVER').setFontSize(16);

    new Typography(this, width * 0.5, 65, `SCR: ${this.payload.score}`);

    new Typography(this, width * 0.5, 75, `HI: ${highScore}`);

    new Button(this, width * 0.5, height - 60, 'MENU').on('click', () => {
      this.scene.start(Menu.KEY);
    });
    new Button(this, width * 0.5, height - 40, 'RESTART').on('click', () => {
      this.scene.start(Play.KEY);
    });

    const enemies = new Enemies(this);
    enemies.spawn(width * Phaser.Math.FloatBetween(0.2, 0.8), height * 0.9);

    this.server.storage.save();
    this.server.leaderboard.submit(this.payload.score);
    this.submitAchievements(highScore);
  }

  submitAchievements(score: number) {
    const achievements: string[] = [];
    const { death, powerUps, smashed } = this.payload;
    death === 'spiker' && achievements.push(achievement('spiker'));
    death === 'chomper' && achievements.push(achievement('chomper'));
    death === 'floater' && achievements.push(achievement('floater'));
    smashed >= 5 && achievements.push(achievement('smasher'));
    powerUps['balloon'] >= 2 && achievements.push(achievement('balloon'));
    powerUps['helicopter'] >= 2 && achievements.push(achievement('helicopter'));
    powerUps['rocket'] >= 2 && achievements.push(achievement('rocket'));
    score >= 1000 && achievements.push(achievement('1000'));
    score >= 2500 && achievements.push(achievement('2500'));
    score >= 5000 && achievements.push(achievement('5000'));
    score >= 7500 && achievements.push(achievement('7500'));
    score >= 10000 && achievements.push(achievement('10000'));
    score >= 15000 && achievements.push(achievement('15000'));
    score >= 20000 && achievements.push(achievement('20000'));

    this.server.achievements.unlock(achievements);
  }
}

const achievement = (name: string) => `bit-jumper:${name}`;
