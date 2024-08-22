import { Typography } from '../objects/ui/typography';
import { PowerUpType } from '../types';

export class ScorePlane extends Phaser.Scene {
  static readonly KEY = 'score-plane';
  static readonly EVENT_UPDATE_SCORE = 'update-score';
  static readonly EVENT_POWER_UP = 'power-up';
  static readonly EVENT_SMASH_ENEMY = 'smash-enemy';
  static readonly SMASH_ENEMY_POINTS = 100;
  typography: Typography;
  score: number;
  smashed: number;
  powerUps: Record<PowerUpType, number>;
  constructor() {
    super(ScorePlane.KEY);
    this.score = 0;
    this.smashed = 0;
    this.powerUps = {
      balloon: 0,
      helicopter: 0,
      rocket: 0,
    };
  }

  updateScore(score: number) {
    this.score = score;
    this.typography.setText(`${score}`);
  }

  create() {
    this.typography = new Typography(this, 4, 4, '0')
      .setAlign('left')
      .setOrigin(0);

    this.events.on(
      ScorePlane.EVENT_UPDATE_SCORE,
      (score: number) => {
        this.updateScore(score);
      },
      this
    );

    this.events.on(
      ScorePlane.EVENT_POWER_UP,
      (key: PowerUpType) => {
        this.powerUps[key]++;
      },
      this
    );

    this.events.on(
      ScorePlane.EVENT_SMASH_ENEMY,
      () => {
        this.updateScore(this.score + ScorePlane.SMASH_ENEMY_POINTS);
        this.smashed++;
      },
      this
    );
  }
}
