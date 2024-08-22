import { DEPTHS } from '../data';
import { DeathReason, PowerUpType } from '../types';
import { Particles } from './particles';
import { Balloon, Helicopter, Rocket } from './power-ups';

export class Player extends Phaser.Physics.Arcade.Sprite {
  static EVENT_POWER_UP_START = 'power-up-start';
  static EVENT_POWER_UP_OVER = 'power-up-over';
  static EVENT_DEATH = 'death';
  static EVENT_SMASH_ENEMY = 'smash-enemy';
  static IMPACT_DEATH_PARTICLE_QUANTITY = 50;
  static FLOOR_DEATH_PARTICLE_QUANTITY = 150;
  static FLASH_DURATION = 1000;
  static FLASH_REPETITIONS = 5;
  jumpLag = 50;
  speed = 75;
  power = 175;
  balloonSpeed = 100;
  balloonDuration = 3000;
  helicopterSpeed = 125;
  helicopterDuration = 3500;
  rocketDuration = 4000;
  rocketSpeed = 250;
  body: Phaser.Physics.Arcade.Body;
  jumping = false;
  powering?: PowerUpType = undefined;
  dead = false;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'jumper_spritesheet', 0);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setBodySize(8, 8);
    this.setDepth(DEPTHS.PLAYER);
    if (!(this.body instanceof Phaser.Physics.Arcade.Body)) {
      throw new Error(
        'Expected body to be an instance of Phaser.Physics.Arcade.Body'
      );
    }

    this.createAnimations();
  }

  createAnimations() {
    if (!this.anims.get('balloon')) {
      this.anims.create({
        key: 'balloon',
        frames: this.anims.generateFrameNumbers('jumper_spritesheet', {
          start: 10,
          end: 13,
        }),
        frameRate: 12,
      });
    }

    if (!this.anims.get('helicopter')) {
      this.anims.create({
        key: 'helicopter',
        frames: this.anims.generateFrameNumbers('jumper_spritesheet', {
          start: 20,
          end: 24,
        }),
        frameRate: 36,
      });
    }

    if (!this.anims.get('rocket')) {
      this.anims.create({
        key: 'rocket',
        frames: this.anims.generateFrameNumbers('jumper_spritesheet', {
          start: 30,
          end: 34,
        }),
        frameRate: 24,
      });
    }
  }

  fall() {
    if (this.jumping) return;
    this.setTexture('jumper_spritesheet', 1);
  }

  jump(multiplier = 1) {
    if (this.body.blocked.down) {
      this.jumping = true;
      this.setTexture('jumper_spritesheet', 2);
      setTimeout(() => {
        this.body.setVelocityY(-this.power * multiplier);
        this.rotation = 0;
        this.setTexture('jumper_spritesheet', 0);
        this.jumping = false;
        this.emit('jump');
      }, this.jumpLag);
    }
  }

  moveLeft() {
    if (this.jumping) this.body.setVelocityX(0);
    else this.body.setVelocityX(-this.speed);
  }

  moveRight() {
    if (this.jumping) this.body.setVelocityX(0);
    else this.body.setVelocityX(this.speed);
  }

  balloon() {
    this.powerUp({
      key: 'balloon',
      duration: this.balloonDuration,
      speed: this.balloonSpeed,
      onComplete: () => {
        const balloon = new Balloon(this.scene, this.x, this.y).release(
          this.balloonSpeed * 1.15,
          this.body.velocity.x
        );
        this.scene.time.delayedCall(5000, () => {
          balloon.terminate();
        });
      },
    });
  }

  helicopter() {
    this.powerUp({
      key: 'helicopter',
      duration: this.helicopterDuration,
      speed: this.helicopterSpeed,
      onComplete: () => {
        const helicopter = new Helicopter(this.scene, this.x, this.y).release(
          this.helicopterSpeed * 1.25
        );
        this.scene.time.delayedCall(5000, () => {
          helicopter.terminate();
        });
      },
    });
  }

  rocket() {
    this.scene.cameras.main.flash(1000, 255, 255, 255);

    const event = this.scene.time.addEvent({
      delay: 50,
      callback: () => {
        this.scene.events.emit(Particles.EXHAUST, 3, this.x, this.y);
      },
      repeat: -1,
    });

    this.powerUp({
      key: 'rocket',
      duration: this.rocketDuration,
      speed: this.rocketSpeed,
      onComplete: () => {
        event.remove();
        const rocket = new Rocket(this.scene, this.x, this.y).release(200);
        this.scene.time.delayedCall(5000, () => {
          rocket.terminate();
        });
      },
    });
  }

  explode(reason: DeathReason) {
    if (this.dead) return false;
    this.body.setVelocity(0);
    this.body.setAllowGravity(false);
    this.body.checkCollision.none = true;
    this.setVisible(false);
    this.dead = true;
    this.emit(Player.EVENT_DEATH, reason);
    this.scene.sound.play('death');
    return true;
  }

  private powerUp({
    key,
    duration,
    speed,
    onComplete,
  }: {
    key: PowerUpType;
    duration: number;
    speed: number;
    onComplete: () => void;
  }) {
    if (this.powering || this.dead) return;

    this.powering = key;
    this.emit(Player.EVENT_POWER_UP_START, key);
    this.scene.sound.play(`${key}_start`, {
      loop: true,
    });
    this.anims.play({
      key,
      repeat: -1,
    });
    this.body.setVelocityY(-Math.abs(speed));
    this.body.setAllowGravity(false);
    this.scene.time.delayedCall(duration, () => {
      this.scene.tweens.add({
        targets: this,
        alpha: 0,
        duration: Player.FLASH_DURATION / Player.FLASH_REPETITIONS / 2,
        yoyo: true,
        repeat: Player.FLASH_REPETITIONS,
        onComplete: () => {
          this.scene.sound.stopByKey(`${key}_start`);
          this.scene.sound.play(`${key}_end`);
          this.alpha = 1;
          this.powering = undefined;
          this.anims.stop();
          this.body.setAllowGravity(true);
          this.setTexture('jumper_spritesheet', 1);
          this.emit(Player.EVENT_POWER_UP_OVER);
          onComplete();
        },
      });
    });
  }
}
