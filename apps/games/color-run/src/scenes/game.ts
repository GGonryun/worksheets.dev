import { AUDIO_SETTINGS } from '../util/settings';
import { theme } from '../util/theme';
import TemplateScene from './template';

class Instructions {
  private tapImage: Phaser.GameObjects.Image;
  private instructions: Phaser.GameObjects.Image;
  constructor(scene: Phaser.Scene, player: Player) {
    const { width, height } = scene.cameras.main;
    this.tapImage = scene.add.image(
      width * 0.5,
      height * (player.spawnHeight - 0.1),
      'tap'
    );
    this.instructions = scene.add.image(
      width * 0.5,
      height * (player.spawnHeight + 0.15),
      'instructions'
    );
  }

  show() {
    this.tapImage.setVisible(true);
    this.instructions.setVisible(true);
  }

  hide() {
    this.tapImage.setVisible(false);
    this.instructions.setVisible(false);
  }
}

class Player {
  private scene: Phaser.Scene;
  private enabled = false;
  private speed = 200;
  private ease = 'Power2';
  private distance = 0.35;
  spawnHeight = 0.7;
  leftBall: Phaser.GameObjects.Image;
  rightBall: Phaser.GameObjects.Image;
  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    const { width, height } = this.scene.cameras.main;
    const xCenter = width * 0.5;
    const ySpawn = height * this.spawnHeight;

    this.leftBall = this.scene.add.image(xCenter, ySpawn, 'ball_red');
    this.leftBall.setOrigin(0.5, 0.5);
    this.leftBall.x -= this.leftBall.width * 0.5;

    this.rightBall = this.scene.add.image(xCenter, ySpawn, 'ball_red');
    this.rightBall.setOrigin(0.5, 0.5);
    this.rightBall.x += this.rightBall.width * 0.5;

    // make the player's balls participate in the physics simulation
    this.scene.physics.world.enable([this.leftBall, this.rightBall]);
    this.createPlayerController();
  }

  enable() {
    this.enabled = true;
  }

  disable() {
    this.enabled = false;
  }

  leftDistance() {
    return this.scene.cameras.main.width * this.distance;
  }

  rightDistance() {
    return this.scene.cameras.main.width * (1 - this.distance);
  }

  createPlayerController() {
    this.scene.input.on('pointerdown', () => {
      if (!this.enabled) return;
      // the left ball moves smoothly to it's new position.
      this.scene.tweens.add({
        targets: this.leftBall,
        x: this.leftDistance(),
        duration: this.speed,
        ease: this.ease,
      });
      // the right ball moves smoothly to it's new position.
      this.scene.tweens.add({
        targets: this.rightBall,
        x: this.rightDistance(),
        duration: this.speed,
        ease: this.ease,
      });
    });
    // if the player releases the screen, the ball moves back to the center.
    this.scene.input.on('pointerup', () => {
      if (!this.enabled) return;
      // the left ball moves smoothly to it's old position.
      this.scene.tweens.add({
        targets: this.leftBall,
        x: this.scene.cameras.main.width * 0.5 - this.leftBall.width * 0.5,
        duration: this.speed,
        ease: this.ease,
      });
      // don't forget to move the right ball as well.
      this.scene.tweens.add({
        targets: this.rightBall,
        x: this.scene.cameras.main.width * 0.5 + this.rightBall.width * 0.5,
        duration: this.speed,
        ease: this.ease,
      });
    });
  }
}

class Enemies {
  private player: Player;
  private score: Score;
  private scene: GameScene;
  private spawner: Phaser.Time.TimerEvent;
  private speed = 1;
  private baseSpeed = 3000;
  private balls = 7;
  private difficulty = 0.01;
  constructor(scene: GameScene, score: Score, player: Player) {
    this.scene = scene;
    this.player = player;
    this.score = score;
    this.spawner = this.scene.time.addEvent({
      paused: true,
    });
  }

  enable() {
    const callback = () => {
      new Enemy(
        this.scene,
        this.score,
        this.player,
        this.baseSpeed / this.speed
      );

      this.speed += this.difficulty;
      // update the interval to reflect the new speed
      this.spawner.reset({
        delay: this.interval(),
        paused: false,
        callbackScope: this,
        callback,
      });
    };

    // start spawning balls
    this.spawner.reset({
      delay: this.interval(),
      paused: false,
      callbackScope: this,
      callback,
    });
  }

  private interval() {
    // if it takes baseSpeed / speed to reach the bottom of the screen.
    // pick an interval that allows there to be 3 balls on the screen at once.
    // so if we want X balls on the screen at once, we need to spawn a ball every
    // baseSpeed / speed / X.
    return this.baseSpeed / this.speed / this.balls;
  }

  disable() {
    // stop spawning balls
    this.spawner.paused = true;
  }
}

type BallType = 'red' | 'orange';

// 40% red balls, 60% orange balls
const BALL_TYPES: BallType[] = ['red', 'red', 'orange', 'orange', 'orange'];

const BALL_TYPE_TO_IMAGE: Record<BallType, string> = {
  red: 'ball_red',
  orange: 'ball_orange',
};

class Enemy {
  private scene: GameScene;
  private score: Score;
  image: Phaser.GameObjects.Image;

  constructor(
    scene: GameScene,
    score: Score,
    player: Player,
    duration: number
  ) {
    this.scene = scene;
    this.score = score;

    const type = BALL_TYPES[Math.floor(Math.random() * BALL_TYPES.length)];

    const { width, height } = scene.cameras.main;
    const xSpawn = width * 0.5; // center of the screen
    const ySpawn = 0;
    this.image = scene.add.image(xSpawn, ySpawn, BALL_TYPE_TO_IMAGE[type]);

    // make the enemy participate in the physics simulation
    scene.physics.world.enable(this.image);
    this.image.setOrigin(0.5, 0.5);
    // the enemy ball moves linearly to the bottom of the screen.
    // when it reaches the bottom, it is destroyed.
    this.scene.tweens.add({
      targets: this.image,
      y: height * 1.1,
      duration: duration,
      callbackScope: this,
      onComplete: () => {
        this.destroy();
      },
    });

    // create a collider between the player's balls and the enemy ball.
    this.scene.physics.add.overlap([player.leftBall], this.image, () => {
      // if the ball type is orange, the game is over.
      if (type === 'orange') {
        this.scene.scene.start('game-over', { score: this.score.value() });
        this.scene.state = 'start';
        this.scene.sound.play('death', AUDIO_SETTINGS);
      } else {
        this.score.increment();
        this.scene.sound.play('collect', AUDIO_SETTINGS);
      }

      // also remove the tween on the ball.
      this.destroy();
    });
  }

  destroy() {
    this.image.destroy();
    this.scene.tweens.killTweensOf(this.image);
  }
}

class Score {
  private score = 0;
  private text: Phaser.GameObjects.Text;
  constructor(scene: Phaser.Scene) {
    this.text = scene.add.text(20, 20, this.scoreText(), {
      fontSize: '30px',
      fontFamily: 'Arial',
      color: theme.red,
    });
  }

  reset() {
    this.set(0);
  }

  value() {
    return this.score;
  }

  increment() {
    this.set(this.score + 1);
  }

  private set(value: number) {
    this.score = value;
    this.text.setText(this.scoreText());
  }

  private scoreText() {
    return `Score: ${this.score}`;
  }
}

export default class GameScene extends TemplateScene {
  private instructions!: Instructions;
  private player!: Player;
  private enemies!: Enemies;
  private score!: Score;
  state: 'start' | 'play' = 'start';
  constructor() {
    super('game');
  }

  preload() {
    super.preload();
    this.load.image('tap', './assets/sprites/game/tap.png');
    this.load.image('instructions', './assets/sprites/game/help.png');
    this.load.image('ball_red', './assets/sprites/game/ball_red.png');
    this.load.image('ball_orange', './assets/sprites/game/ball_orange.png');
    this.load.audio('collect', './assets/audio/collect.wav');
    this.load.audio('start', './assets/audio/start.wav');
    this.load.audio('death', './assets/audio/death.wav');
  }

  create() {
    super.create();

    this.player = new Player(this);
    this.score = new Score(this);
    this.instructions = new Instructions(this, this.player);
    this.enemies = new Enemies(this, this.score, this.player);

    // don't start the game until the user clicks
    this.input.on('pointerdown', () => {
      if (this.state !== 'play') {
        this.state = 'play';
        this.sound.play('start', AUDIO_SETTINGS);
        this.startGame();
      }
    });
  }

  private startGame() {
    this.instructions.hide();
    this.score.reset();
    this.enemies.enable();
    this.player.enable();
  }
}
