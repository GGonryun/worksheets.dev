import { CharityGamesPlugin } from '@worksheets/phaser/plugins';

import {
  COIN_PURSE,
  getHighScore,
  getLifetimeCoins,
  getLifetimeDamage,
  getLifetimeJumps,
  getPlayerCoins,
  HIGH_SCORE,
  LIFETIME_COINS,
  LIFETIME_DAMAGE,
  LIFETIME_JUMPS,
} from '../data/storage';
import { GameOverResults } from '../types/shared';

export class GameOver extends Phaser.Scene {
  width: number;
  height: number;
  centerWidth: number;
  centerHeight: number;
  results: GameOverResults;
  highScore: number;
  server!: CharityGamesPlugin;
  constructor() {
    super({ key: 'gameover' });
    this.width = 0;
    this.height = 0;
    this.centerWidth = 0;
    this.centerHeight = 0;
    this.highScore = 0;
    this.results = {
      score: 0,
      coins: 0,
      healthLost: 0,
      jumps: 0,
    };
  }

  init(value: GameOverResults) {
    this.server = CharityGamesPlugin.find(this);

    this.results = {
      score: value.score ?? 0,
      coins: value.coins ?? 0,
      healthLost: value.healthLost ?? 0,
      jumps: value.jumps ?? 0,
    };

    const score = getHighScore(this.server);
    const playerCoins = getPlayerCoins(this.server);
    const lifetimeCoins = getLifetimeCoins(this.server);
    const lifetimeDamage = getLifetimeDamage(this.server);
    const lifetimeJumps = getLifetimeJumps(this.server);

    this.highScore = Math.max(score, value.score);

    const updatedLifetimeCoins = lifetimeCoins + value.coins;
    const updatedLifetimeDamage = lifetimeDamage + value.healthLost;
    const updatedLifetimeJumps = lifetimeJumps + value.jumps;

    this.server.storage.set(HIGH_SCORE.KEY, this.highScore);
    this.server.storage.set(COIN_PURSE.KEY, this.results.coins + playerCoins);
    this.server.storage.set(LIFETIME_COINS.KEY, updatedLifetimeCoins);
    this.server.storage.set(LIFETIME_DAMAGE.KEY, updatedLifetimeDamage);
    this.server.storage.set(LIFETIME_JUMPS.KEY, updatedLifetimeJumps);
    this.server.storage.save();

    this.updateAchievements({
      score,
      lifetimeCoins: updatedLifetimeCoins,
      lifetimeDamage: updatedLifetimeDamage,
      lifetimeJumps: updatedLifetimeJumps,
    });

    this.server.leaderboard.submit(this.results.score);
  }

  create() {
    this.width = Number(this.sys.game.config.width);
    this.height = Number(this.sys.game.config.height);
    this.centerWidth = this.width / 2;
    this.centerHeight = this.height / 2;

    this.cameras.main.setBackgroundColor(0x87ceeb);

    this.add
      .bitmapText(
        this.centerWidth,
        this.height * 0.15,
        'arcade',
        'GAME OVER',
        24
      )
      .setOrigin(0.5)
      .setLetterSpacing(8)
      .setDropShadow(1, 1, 0x000000, 1);

    this.add
      .bitmapText(
        this.centerWidth,
        this.height * 0.3,

        'arcade',
        `Score: ${this.results.score}`,
        10
      )
      .setOrigin(0.5)
      .setLetterSpacing(3)
      .setDropShadow(1, 1, 0x000000, 1);

    this.add
      .bitmapText(
        this.centerWidth,
        this.height * 0.375,
        'arcade',
        `High Score: ${this.highScore}`,
        10
      )
      .setOrigin(0.5)
      .setLetterSpacing(3)
      .setDropShadow(1, 1, 0x000000, 1);

    this.add
      .bitmapText(
        this.centerWidth,
        this.height * 0.55,
        'arcade',
        `Coins: ${this.results.coins}`,
        10
      )
      .setOrigin(0.5)
      .setLetterSpacing(3)
      .setDropShadow(1, 1, 0x000000, 1);

    this.add
      .sprite(this.centerWidth, this.height * 0.85, 'button_main_menu')
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', this.startGame, this);
  }

  startGame() {
    this.scene.start('menu');
  }

  updateAchievements({
    score,
    lifetimeCoins,
    lifetimeDamage,
    lifetimeJumps,
  }: {
    score: number;
    lifetimeCoins: number;
    lifetimeDamage: number;
    lifetimeJumps: number;
  }) {
    const achievements: string[] = [];

    // base score achievements.
    score >= 100 && achievements.push('DINO_DASH_SCORE_100');
    score >= 500 && achievements.push('DINO_DASH_SCORE_500');
    score >= 1000 && achievements.push('DINO_DASH_SCORE_1000');
    score >= 2500 && achievements.push('DINO_DASH_SCORE_2500');
    score >= 5000 && achievements.push('DINO_DASH_SCORE_5000');

    // lifetime coins achievements.
    lifetimeCoins >= 1 && achievements.push('DINO_DASH_COINS_1');
    lifetimeCoins >= 10 && achievements.push('DINO_DASH_COINS_10');
    lifetimeCoins >= 50 && achievements.push('DINO_DASH_COINS_50');
    lifetimeCoins >= 100 && achievements.push('DINO_DASH_COINS_100');
    lifetimeCoins >= 250 && achievements.push('DINO_DASH_COINS_250');

    // lifetime damage achievements.
    lifetimeDamage >= 1 && achievements.push('DINO_DASH_DAMAGE_1');
    lifetimeDamage >= 10 && achievements.push('DINO_DASH_DAMAGE_10');
    lifetimeDamage >= 25 && achievements.push('DINO_DASH_DAMAGE_25');
    lifetimeDamage >= 50 && achievements.push('DINO_DASH_DAMAGE_50');
    lifetimeDamage >= 100 && achievements.push('DINO_DASH_DAMAGE_100');

    // lifetime jumps achievements.
    lifetimeJumps >= 1 && achievements.push('DINO_DASH_JUMPS_1');
    lifetimeJumps >= 50 && achievements.push('DINO_DASH_JUMPS_50');
    lifetimeJumps >= 100 && achievements.push('DINO_DASH_JUMPS_100');
    lifetimeJumps >= 500 && achievements.push('DINO_DASH_JUMPS_500');
    lifetimeJumps >= 1000 && achievements.push('DINO_DASH_JUMPS_1000');

    this.server.achievements.unlock(achievements);
  }
}
