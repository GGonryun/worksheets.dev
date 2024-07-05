import { ObjectPool } from '@worksheets/phaser/core/object-pool';

import {
  DEFAULT_DIFFICULTY,
  DIFFICULTY_INCREMENT,
  MAX_DIFFICULTY,
} from '../data/settings';
import { Game } from '../scenes/game';
import { Cloud } from './cloud';
import { Coin } from './coin';
import { Obstacle } from './obstacle';

export class Generator {
  scene: Game;
  difficulty: number;
  obstacles: ObjectPool<Obstacle>;
  clouds: ObjectPool<Cloud>;
  coins: ObjectPool<Coin>;
  constructor(scene: Game) {
    this.scene = scene;
    this.difficulty = DEFAULT_DIFFICULTY;
    this.obstacles = new ObjectPool(() => new Obstacle(this.scene));
    this.clouds = new ObjectPool(() => new Cloud(this.scene));
    this.coins = new ObjectPool(() => new Coin(this.scene));
    this.scene.time.delayedCall(0, () => this.init(), undefined, this);
  }

  reset() {
    this.difficulty = DEFAULT_DIFFICULTY;
  }

  init() {
    this.generateCloud();
    this.generateObstacle();
    this.generateCoin();
  }

  generateCloud() {
    const cloud = this.clouds.get();
    const rng = Phaser.Math.FloatBetween(1, 3);
    cloud.spawn(800, Phaser.Math.Between(0, 24), rng);

    this.scene.time.delayedCall(
      Phaser.Math.Between(1000, 5000),
      () => this.generateCloud(),
      undefined,
      this
    );
  }

  generateObstacle() {
    const obstacle = this.obstacles.get();

    obstacle.spawn(800, this.scene.height);

    this.scene.time.delayedCall(
      Phaser.Math.Between(1000 / this.difficulty, 3000 / this.difficulty),
      () => this.generateObstacle(),
      undefined,
      this
    );
  }

  generateCoin() {
    this.difficulty = Math.min(
      MAX_DIFFICULTY,
      this.difficulty + DIFFICULTY_INCREMENT
    );

    const coin = this.coins.get();

    coin.spawn(800, this.scene.height - Phaser.Math.Between(50, 100));

    this.scene.time.delayedCall(
      Phaser.Math.Between(2000, 10000),
      () => this.generateCoin(),
      undefined,
      this
    );
  }

  update() {
    this.scene.obstacles?.getChildren().forEach((obstacle) => {
      obstacle.update();
    });

    this.scene.coins?.getChildren().forEach((coin) => {
      coin.update();
    });
  }
}
