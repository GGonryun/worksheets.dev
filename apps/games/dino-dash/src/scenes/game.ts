import { CharityGamesPlugin } from '@worksheets/phaser/plugins';

import { Coin } from '../objects/coin';
import { Dust } from '../objects/dust';
import { Floor } from '../objects/floor';
import { Generator } from '../objects/generator';
import { Health } from '../objects/health';
import { ParallaxBackground } from '../objects/parallax-background';
import { Player } from '../objects/player';
import { GameOverResults } from '../types/shared';

type GameAudios = {
  jump: Phaser.Sound.BaseSound;
  coin: Phaser.Sound.BaseSound;
  dead: Phaser.Sound.BaseSound;
  damage: Phaser.Sound.BaseSound;
};

export class Game extends Phaser.Scene {
  score: number;
  width: number;
  height: number;
  centerWidth: number;
  centerHeight: number;
  // objects.
  health!: Health;
  server?: CharityGamesPlugin;
  scoreText?: Phaser.GameObjects.BitmapText;
  player?: Player;
  dust?: Dust;
  floor?: Floor;
  obstacles?: Phaser.GameObjects.Group;
  coins?: Phaser.GameObjects.Group;
  generator?: Generator;
  background?: ParallaxBackground;
  space?: Phaser.Input.Keyboard.Key;
  updateScoreEvent?: Phaser.Time.TimerEvent;
  audios?: GameAudios;
  theme?: Phaser.Sound.BaseSound;
  jumping?: boolean;
  collided?: boolean;
  collected: number;

  constructor() {
    super({ key: 'game' });
    this.score = 0;
    this.width = 0;
    this.height = 0;
    this.centerWidth = 0;
    this.centerHeight = 0;
    this.collected = 0;
  }

  preload() {
    this.score = 0;
  }

  create() {
    this.server = CharityGamesPlugin.find(this);
    this.width = Number(this.sys.game.config.width);
    this.height = Number(this.sys.game.config.height);
    this.centerWidth = this.width / 2;
    this.centerHeight = this.height / 2;

    this.cameras.main.setBackgroundColor(0x87ceeb);
    this.obstacles = this.add.group();
    this.coins = this.add.group();
    this.generator = new Generator(this);
    this.background = new ParallaxBackground(this);
    this.player = new Player(this, this.centerWidth - 75, this.height - 100);
    this.dust = new Dust(this);
    this.floor = new Floor(this);
    this.collided = false;
    this.jumping = false;

    this.space = this.input.keyboard?.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    this.scoreText = this.add
      .bitmapText(this.centerWidth, 6, 'arcade', this.score.toString(), 18)
      .setOrigin(0.5, 0)
      .setDropShadow(1, 1, 0x000000, 1);
    this.physics.add.overlap(
      this.player,
      this.obstacles,
      hitObstacle(this),
      () => true,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.coins,
      hitCoin(this),
      () => true,
      this
    );

    this.physics.add.collider(this.player, this.floor);

    this.loadAudios();

    this.input.on(
      'pointerdown',
      (data: { downY: number }) => {
        if (data.downY > 32) {
          this.jump();
        }
      },
      this
    );

    this.updateScoreEvent = this.time.addEvent({
      delay: 100,
      callback: () => this.updateScore(),
      callbackScope: this,
      loop: true,
    });

    this.health = new Health(this);
  }

  loadAudios() {
    this.audios = {
      jump: this.sound.add('jump'),
      coin: this.sound.add('coin'),
      dead: this.sound.add('dead'),
      damage: this.sound.add('damage'),
    };
  }

  playAudio(key: keyof GameAudios) {
    this.audios?.[key].play();
  }

  jump() {
    if (this.player && this.player.jump()) {
      this.playAudio('jump');
      if (this.player.body instanceof Phaser.Physics.Arcade.Body) {
        this.jumping = true;
        this.dust?.spawn(
          this.player.x,
          this.player.y + this.player.body.offset.y
        );
      }
    }
  }

  update() {
    this.background?.update();
    this.floor?.update();
    this.generator?.update();

    const body =
      this.player?.body &&
      this.player.body instanceof Phaser.Physics.Arcade.Body
        ? this.player.body
        : undefined;

    if (body?.blocked.down) {
      if (this.player) {
        if (body.deltaY() > 0 && body.onFloor() && this.jumping) {
          this.jumping = false;
          this.player.fall();
        }
        this.player.rotation = 0;
      }
    }
  }

  updateScore(points = 1) {
    this.score += points;
    this.scoreText?.setText(this.score.toString());
  }

  async takeDamage() {
    const remaining = this.health.get();
    if (!this.player?.invincible && remaining > 1) {
      this.playAudio('damage');
      this.health.decrease();
      await this.player?.blink();
      this.collided = false;
    } else {
      this.collided = false;
      this.updateScoreEvent?.destroy();
      this.finishScene();
    }
  }

  finishScene() {
    this.theme?.stop();
    this.playAudio('dead');

    this.goToGameOver();
  }

  goToGameOver() {
    const statistics: GameOverResults = {
      score: this.score,
      coins: this.collected,
      healthLost: this.health.max,
      jumps: this.player?.jumps || 0,
    };
    this.scene.start('gameover', statistics);
  }
}

const hitCoin =
  (game: Game): Phaser.Types.Physics.Arcade.ArcadePhysicsCallback =>
  (_, coin) => {
    game.playAudio('coin');
    game.updateScore(100);
    if (coin instanceof Coin) {
      coin.hide();
      game.collected += 1;
    }
  };

const hitObstacle =
  (game: Game): Phaser.Types.Physics.Arcade.ArcadePhysicsCallback =>
  () => {
    if (!game.collided) {
      game.takeDamage();
      game.collided = true;
    }
  };
