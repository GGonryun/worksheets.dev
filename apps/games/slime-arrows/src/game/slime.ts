import { getCenterOfCamera } from '@worksheets/phaser/cameras';
import { Movement } from '@worksheets/phaser/types';

import { ElementDepth } from '../util/depth';

export class Slime extends Phaser.Physics.Arcade.Sprite {
  behavior: ISlimeBehavior;
  constructor(scene: Phaser.Scene) {
    // get the center of the screen
    const { x, y } = getCenterOfCamera(scene.cameras.main);

    super(scene, x, y, 'slime-idle');

    this.behavior = new IdleSlimeBehavior(this);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setDepth(ElementDepth.Slime);
    this.setScale(1);
    this.setSize(16, 10);
    // set world collision
    this.setCollideWorldBounds(true);
  }

  act(movement: Movement) {
    this.behavior = this.behavior.act(movement);
  }

  halt() {
    this.behavior = this.behavior.halt();
  }

  kill() {
    this.behavior = new DeadSlimeBehavior(this);
    this.disableBody();
  }

  respawn() {
    const { x, y } = getCenterOfCamera(this.scene.cameras.main);
    this.behavior = new IdleSlimeBehavior(this);
    this.enableBody(true, x, y);
    this.scene.tweens.addCounter({
      duration: 50,
      delay: 50,
      loop: 2,
      yoyo: true,
      onStart: () => {
        this.setTintFill(0xffffff);
      },
      onLoop: () => {
        this.clearTint();
      },
      onComplete: () => {
        this.clearTint();
      },
    });
  }

  static preload(scene: Phaser.Scene) {
    scene.anims.create({
      key: 'slime-idle',
      frames: scene.anims.generateFrameNumbers('slime-idle', {
        start: 0,
        end: 2,
      }),
      frameRate: 6,
      yoyo: true,
      repeat: -1,
    });
    scene.anims.create({
      key: 'slime-walk',
      frames: scene.anims.generateFrameNumbers('slime-walk', {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });
    scene.anims.create({
      key: 'slime-die',
      frames: scene.anims.generateFrameNumbers('slime-die', {
        start: 0,
        end: 9,
      }),
      frameRate: 30,
      repeat: 0,
    });
  }
}

type ISlimeBehavior = {
  act: (movement: Movement) => ISlimeBehavior;
  halt: () => ISlimeBehavior;
};

class IdleSlimeBehavior implements ISlimeBehavior {
  slime: Slime;
  constructor(slime: Slime) {
    this.slime = slime;
    this.slime.anims.play('slime-idle');
  }

  act() {
    return new MovingSlimeBehavior(this.slime);
  }
  halt() {
    return this;
  }
}

class MovingSlimeBehavior implements ISlimeBehavior {
  speed = 64;
  slime: Slime;
  constructor(slime: Slime) {
    this.slime = slime;
    this.slime.anims.play('slime-walk');
  }

  act(movement: Movement) {
    const { x, y } = normalizeMovement(movement);
    this.slime.setVelocityX(x * this.speed);
    this.slime.setVelocityY(y * this.speed);
    return this;
  }
  halt() {
    this.slime.setVelocity(0, 0);
    return new IdleSlimeBehavior(this.slime);
  }
}

class DeadSlimeBehavior implements ISlimeBehavior {
  slime: Slime;
  constructor(slime: Slime) {
    this.slime = slime;
    this.slime.anims.play('slime-die');
    this.slime.setVelocity(0, 0);
  }

  act() {
    return this;
  }
  halt() {
    return this;
  }
}

const normalizeMovement = (movement: Movement) => {
  //convert angle to an X/Y vector normalized to 1
  const x = Math.cos(movement.angle);
  const y = Math.sin(movement.angle);
  return { x, y };
};
