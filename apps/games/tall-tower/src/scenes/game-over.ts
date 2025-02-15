import { CharityGamesPlugin } from '@worksheets/phaser/plugins';

import { GameOverPayload } from '../types';
import { yellow } from '../util';

const BONUS_PRIZE_THRESHOLD = 12;
const MINOR_PRIZE_THRESHOLD = 6;
const MAJOR_PRIZE_THRESHOLD = 0;
const PARTICLES = 3;

export class GameOver extends Phaser.Scene {
  payload!: GameOverPayload;
  coins!: Phaser.GameObjects.Particles.ParticleEmitter;
  blueGem!: Phaser.GameObjects.Particles.ParticleEmitter;
  dollar!: Phaser.GameObjects.Particles.ParticleEmitter;
  server!: CharityGamesPlugin;

  constructor() {
    super('game_over');
  }

  init(payload: GameOverPayload) {
    this.payload = payload;
    this.server = CharityGamesPlugin.find(this);
  }

  create() {
    const { width, height } = this.cameras.main;

    this.createParticles();
    this.add.tileSprite(0, 0, width, height, 'wallpaper').setOrigin(0);

    this.addText();
    this.addButtons();
    this.addChest();

    this.submitLeaderboard();
    this.submitAchievements();
  }

  submitLeaderboard() {
    this.server.leaderboard.submit(this.payload.score);
  }

  submitAchievements() {
    const { placements } = this.payload;
    const achievements: string[] = [];
    const bonusLine = placements[BONUS_PRIZE_THRESHOLD];
    const minorLine = placements[MINOR_PRIZE_THRESHOLD];
    const majorLine = placements[MAJOR_PRIZE_THRESHOLD];
    bonusLine > 0 && achievements.push('TALL_TOWER_BONUS_1');
    bonusLine > 1 && achievements.push('TALL_TOWER_BONUS_2');
    bonusLine > 2 && achievements.push('TALL_TOWER_BONUS_3');
    minorLine > 0 && achievements.push('TALL_TOWER_MINOR_1');
    minorLine > 1 && achievements.push('TALL_TOWER_MINOR_2');
    minorLine > 2 && achievements.push('TALL_TOWER_MINOR_3');
    majorLine > 0 && achievements.push('TALL_TOWER_MAJOR_1');
    majorLine > 1 && achievements.push('TALL_TOWER_MAJOR_2');
    majorLine > 2 && achievements.push('TALL_TOWER_MAJOR_3');
    this.server.achievements.unlock(achievements);
  }

  addText() {
    const { width, height } = this.cameras.main;

    this.payload.bonus &&
      this.add
        .bitmapText(width * 0.5, height * 0.09, 'peaberry', 'BONUS RUN!', 28)
        .setTintFill(yellow)
        .setDropShadow(4, 4, 0x000000, 1)
        .setOrigin(0.5);

    this.add
      .bitmapText(
        width * 0.5,
        height * 0.15,
        'peaberry',
        this.payload.height < MAJOR_PRIZE_THRESHOLD ? 'CONGRATS!' : 'GAME OVER',
        54
      )
      .setDropShadow(4, 4, 0x000000, 1)
      .setOrigin(0.5);
  }

  addChest() {
    const { width, height } = this.cameras.main;

    const x = width * 0.5;
    const y = height * 0.51;
    const chest = this.add.sprite(x, y, 'chest').setScale(5);
    if (this.payload.height < BONUS_PRIZE_THRESHOLD) {
      chest
        .play({
          key: 'chest',
          delay: 500,
        })
        .on('animationcomplete', () => {
          this.explode(x, y);
          this.tweenPrize(x, y);
          const success = this.sound.add('success_1');
          success.play();
          success.on('complete', () => {
            this.sound.play('success_2');
          });
        });
    } else {
      chest.setAngle(-5);
      this.tweens.add({
        targets: chest,
        yoyo: true,
        // make the chest rotate and wiggle.
        angle: 5,
        duration: 100,
        repeat: 20,
        ease: 'Sine.easeInOut',
        onComplete() {
          chest.setAngle(0);
        },
      });
    }
  }

  addButtons() {
    const { width, height } = this.cameras.main;

    const retry = this.add
      .bitmapText(width * 0.5, height * 1.2, 'peaberry', 'RETRY', 48)
      .setOrigin(0.5)
      .setDropShadow(4, 4, 0x000000, 1)
      .on('pointerdown', () => {
        this.scene.start('game');
        this.sound.play('select');
      });

    const menu = this.add
      .bitmapText(width * 0.5, height * 1.2, 'peaberry', 'MENU', 48)
      .setDropShadow(4, 4, 0x000000, 1)
      .setOrigin(0.5)
      .on('pointerdown', () => {
        this.scene.start('menu');
        this.sound.play('select');
      });

    const score = this.add
      .bitmapText(
        width * 0.5,
        height * 1.2,
        'peaberry',
        `Score: ${this.payload.score}`,
        20
      )
      .setDropShadow(4, 4, 0x000000, 1)
      .setOrigin(0.5);

    const tall = this.add
      .bitmapText(
        width * 0.5,
        height * 1.2,
        'peaberry',
        `Height: ${19 - this.payload.height}`,
        20
      )
      .setDropShadow(4, 4, 0x000000, 1)
      .setOrigin(0.5);
    this.add.tween({
      targets: retry,
      y: height * 0.65,
      duration: 500,
      onComplete() {
        this.add.tween({
          targets: retry,
          scaleX: 1.1,
          scaleY: 1.1,
          duration: 500,
          ease: 'Sine.easeInOut',
          yoyo: true,
          repeat: -1,
        });
        this.add.tween({
          targets: menu,
          y: height * 0.75,
          duration: 500,
        });
        this.add.tween({
          targets: score,
          y: height * 0.85,
          duration: 500,
        });
        this.add.tween({
          targets: tall,
          y: height * 0.91,
          duration: 500,
        });
        menu.setInteractive();
        retry.setInteractive();

        this.input.keyboard?.on(
          'keydown-SPACE',
          () => {
            this.scene.start('game');
            this.sound.play('select');
          },
          this
        );
      },
      callbackScope: this,
    });
  }

  tweenPrize(x: number, y: number) {
    const phrase =
      this.payload.height < MAJOR_PRIZE_THRESHOLD
        ? 'Major Prize!'
        : this.payload.height < MINOR_PRIZE_THRESHOLD
        ? 'Minor Prize!'
        : this.payload.height < BONUS_PRIZE_THRESHOLD
        ? 'Bonus Prize!'
        : 'Game Over!';

    const text = this.add
      .bitmapText(x, y, 'peaberry', phrase, 48)
      .setOrigin(0.5)
      .setTint(yellow)
      .setAlpha(0)
      .setDepth(2)
      .setAngle(-15)
      .setScale(0)
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('menu');
      });

    this.tweens.add({
      targets: text,
      alpha: 1,
      scale: 1,
      y: y - 150,
      duration: 1000,
      ease: 'Bounce.easeOut',
      onComplete: () => {
        this.sound.play('victory');
      },
    });
  }

  explode(x: number, y: number) {
    const quantity = (20 - this.payload.height) * PARTICLES;

    this.coins.explode(quantity, x, y);
    this.blueGem.explode(quantity, x, y);
    this.dollar.explode(quantity, x, y);
  }

  createParticles() {
    const opts = {
      lifespan: 10000,
      gravityY: 800,
      speedY: { min: -300, max: -800 },
      speedX: { min: -300, max: 300 },
      scale: { start: 1, end: 0 },
      rotate: { min: -360, max: 360 },
      alpha: { start: 1, end: 0 },
      emitting: false,
    };
    this.coins = this.add.particles(0, 0, 'coin', opts).setDepth(2);
    this.blueGem = this.add.particles(0, 0, 'blue_gem', opts).setDepth(2);
    this.dollar = this.add
      .particles(0, 0, 'dollar', { ...opts, gravityY: 500 })
      .setDepth(2);
  }
}
