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

class Difficulty {
  baseSpeed = 3000;
  multiplier = 1;
  difficulty = 0.01;
  quantity = 6;

  get ballSpeed() {
    return this.baseSpeed / this.multiplier;
  }

  get spawnFrequency() {
    return this.ballSpeed / this.quantity;
  }

  increaseDifficulty() {
    this.multiplier += this.difficulty;
  }
}

class Generator {
  scene: GameScene;
  constructor(scene: GameScene) {
    this.scene = scene;
  }

  generate() {
    const { width, height } = this.scene.cameras.main;

    const xSpawn = width * 0.5; // center of the screen
    const ySpawn = height * 0.5;

    const type = BALL_TYPES[Math.floor(Math.random() * BALL_TYPES.length)];
    const sprite = BALL_TYPE_TO_IMAGE[type];

    const ball = new Ball(this.scene, xSpawn, ySpawn, sprite);

    if (type === 'orange') {
      this.scene.enemies.add(ball);
    } else {
      this.scene.points.add(ball);
    }

    this.scene.time.delayedCall(
      this.scene.difficulty.spawnFrequency,
      () => this.generate(),
      undefined,
      this
    );

    this.scene.difficulty.increaseDifficulty();
  }
}

type BallType = 'red' | 'orange';

// 40% red balls, 60% orange balls
const BALL_TYPES: BallType[] = ['red', 'red', 'orange', 'orange', 'orange'];

const BALL_TYPE_TO_IMAGE: Record<BallType, string> = {
  red: 'ball_red',
  orange: 'ball_orange',
};

class Ball extends Phaser.GameObjects.Sprite {
  scene: GameScene;

  constructor(scene: GameScene, x: number, y: number, sprite: string) {
    super(scene, x, y, sprite);
    this.scene = scene;
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setOrigin(0.5, 0.5);

    if (this.body instanceof Phaser.Physics.Arcade.Body) {
      this.body.setAllowGravity(false);
    }

    this.scene.tweens.add({
      targets: this,
      y: { from: 0, to: 1000 },
      duration: this.scene.difficulty.ballSpeed,
      onComplete: () => {
        this.destroy();
      },
    });
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
  score!: Score;
  state: 'start' | 'play' = 'start';
  enemies!: Phaser.GameObjects.Group;
  points!: Phaser.GameObjects.Group;
  generator!: Generator;
  difficulty!: Difficulty;

  constructor() {
    super('game');
  }

  create() {
    super.create();

    this.difficulty = new Difficulty();
    this.generator = new Generator(this);
    this.player = new Player(this);
    this.score = new Score(this);
    this.instructions = new Instructions(this, this.player);
    this.physics.world.fixedStep = false;
    this.enemies = this.add.group();
    this.points = this.add.group();

    this.physics.add.collider(
      this.player.leftBall,
      this.enemies,
      hitEnemy(this),
      () => true,
      this
    );

    this.physics.add.collider(
      this.player.rightBall,
      this.points,
      hitPoint(this),
      () => true,
      this
    );

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
    this.time.delayedCall(
      1000,
      () => this.generator.generate(),
      undefined,
      this
    );

    this.instructions.hide();
    this.score.reset();
    this.player.enable();
  }
}

const hitEnemy =
  (game: GameScene): Phaser.Types.Physics.Arcade.ArcadePhysicsCallback =>
  (_, collided) => {
    game.scene.start('game-over', { score: game.score.value() });
    game.state = 'start';
    game.sound.play('death', AUDIO_SETTINGS);

    collided.destroy();
  };

const hitPoint =
  (game: GameScene): Phaser.Types.Physics.Arcade.ArcadePhysicsCallback =>
  (_, collided) => {
    game.score.increment();
    game.sound.play('collect', AUDIO_SETTINGS);

    collided.destroy();
  };
