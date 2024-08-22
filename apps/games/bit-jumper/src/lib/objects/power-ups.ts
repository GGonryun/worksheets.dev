import { DEPTHS } from '../data';
import { Particles } from './particles';

export class PowerUps extends Phaser.GameObjects.Group {
  static SPAWN_CHANCE = 1;
  constructor(scene: Phaser.Scene) {
    super(scene);
  }

  spawn(x: number, y: number) {
    const type = Phaser.Math.Between(0, 100);

    if (type < 50) {
      this.add(new Balloon(this.scene, x, y - Balloon.HEIGHT_OFFSET));
    } else if (type < 90) {
      this.add(new Helicopter(this.scene, x, y - Helicopter.HEIGHT_OFFSET));
    } else {
      this.add(new Rocket(this.scene, x, y - Rocket.HEIGHT_OFFSET));
    }
  }
}

export class PowerUp extends Phaser.Physics.Arcade.Sprite {
  body: Phaser.Physics.Arcade.Body;
  constructor(scene: Phaser.Scene, x: number, y: number, frame: number) {
    super(scene, x, y, 'jumper_spritesheet', frame);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setDepth(DEPTHS.POWER_UP);
    if (!(this.body instanceof Phaser.Physics.Arcade.Body)) {
      throw new Error(
        'Expected body to be an instance of Phaser.Physics.Arcade.Body'
      );
    }

    this.body.setAllowGravity(false);
  }

  release(speed = 10, variance = 10) {
    this.setVelocityY(-Math.abs(speed));
    this.setVelocityX(Phaser.Math.Between(-variance, variance));
    return this;
  }

  terminate() {
    this.destroy();
  }
}

export class Balloon extends PowerUp {
  static HEIGHT_OFFSET = 6;
  event: Phaser.Time.TimerEvent;
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 6);

    this.setBodySize(5, 8);
  }

  terminate() {
    this.scene.events.emit(Particles.RINGS, this.x, this.y);
    super.terminate();
  }
}

export class Helicopter extends PowerUp {
  static HEIGHT_OFFSET = 5;
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 7);
    this.body.setSize(8, 8);
  }

  release(speed: number) {
    super.release(speed);
    this.body.setAllowGravity(true);
    this.body.setAngularVelocity(Phaser.Math.Between(speed, speed * 3));
    return this;
  }
}

export class Rocket extends PowerUp {
  static HEIGHT_OFFSET = 5;
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 8);
    this.setBodySize(8, 8);
  }

  release(speed: number) {
    super.release(speed);
    this.setTexture('jumper_spritesheet', 35);
    this.setVelocityY(-Math.abs(speed));
    return this;
  }
}
