import { assertNever } from '@worksheets/util/errors';
import { once } from '@worksheets/util/functions';

import { DEPTHS, OUT_OF_BOUNDS } from '../data';
import { EnemyType } from '../types';
import { Observer } from './observer';

export class Enemies extends Phaser.GameObjects.Group {
  static SPAWN_CHANCE = 7;
  static RECLAIM_OFFSET = 100;
  static PREFILL_QUANTITY = 20;
  observer: Observer;
  recycled: Record<EnemyType, Enemy[]>;
  constructor(scene: Phaser.Scene) {
    super(scene);
    this.recycled = {
      spiker: [],
      chomper: [],
      floater: [],
    };
    this.createAnimations();
    this.prefill();
  }

  prefill() {
    // create 10 of each enemy type
    for (let i = 0; i < Enemies.PREFILL_QUANTITY; i++) {
      this.recycled.spiker.push(new Spiker(this));
      this.recycled.chomper.push(new Chomper(this));
      this.recycled.floater.push(new Floater(this));
    }
  }

  spawn(x: number, y: number) {
    this.spawnType(x, y, this.randomKey());
  }

  spawnType(x: number, y: number, type: EnemyType) {
    const enemy = this.getOrCreate(type);
    this.add(enemy.place(x, y));
  }

  createAnimations() {
    if (!this.scene.anims.get('spike')) {
      this.scene.anims.create({
        key: 'spike',
        frames: this.scene.anims.generateFrameNumbers('jumper_spritesheet', {
          start: 60,
          end: 62,
        }),
        frameRate: 4,
      });
    }
  }

  update() {
    this.children.iterate((enemy: Phaser.GameObjects.GameObject) => {
      if (enemy instanceof Enemy) {
        const camera = this.scene.cameras.main;
        if (enemy.y > camera.scrollY + camera.height + Enemies.RECLAIM_OFFSET) {
          enemy.terminate();
        }
      }
      return true;
    });
  }

  getOrCreate(key: EnemyType) {
    const category = this.recycled[key];
    if (category.length) {
      return category.pop() as Enemy;
    } else {
      const EnemyConstructor = this.pickConstructor(key);
      return new EnemyConstructor(this);
    }
  }

  randomKey() {
    const keys = Object.keys(this.recycled) as EnemyType[];
    return Phaser.Math.RND.pick(keys);
  }

  pickConstructor(key: EnemyType) {
    switch (key) {
      case 'spiker':
        return Spiker;
      case 'chomper':
        return Chomper;
      case 'floater':
        return Floater;
      default:
        throw assertNever(key);
    }
  }
}

export abstract class Enemy extends Phaser.Physics.Arcade.Sprite {
  static PARTICLE_QUANTITY = 25;
  declare type: EnemyType;
  enemies: Enemies;
  body: Phaser.Physics.Arcade.Body;
  constructor(enemies: Enemies) {
    super(
      enemies.scene,
      OUT_OF_BOUNDS.x,
      OUT_OF_BOUNDS.y,
      'jumper_spritesheet',
      0
    );
    this.enemies = enemies;
    enemies.scene.add.existing(this);
    enemies.scene.physics.add.existing(this);
    this.setBodySize(12, 12);
    this.setDepth(DEPTHS.ENEMY);
    if (!(this.body instanceof Phaser.Physics.Arcade.Body)) {
      throw new Error(
        'Expected body to be an instance of Phaser.Physics.Arcade.Body'
      );
    }
    this.body.setAllowGravity(false);
    this.body.setImmovable(true);
  }

  place(x: number, y: number) {
    this.body.checkCollision.none = false;
    this.setVisible(true);
    this.x = x;
    this.y = y;
    this.animate();
    return this;
  }

  terminate() {
    this.body.checkCollision.none = true;
    this.setVisible(false);
    this.enemies.remove(this);
    this.enemies.recycled[this.type].push(this);
  }

  abstract animate(): void;
}

export class Spiker extends Enemy {
  type: EnemyType = 'spiker';
  bouncing?: Phaser.Tweens.Tween;
  blinking?: Phaser.Time.TimerEvent;
  wandering?: Phaser.Tweens.Tween;

  constructor(enemies: Enemies) {
    super(enemies);
    this.setTexture('jumper_spritesheet', 60);
  }

  animate() {
    this.blink();
    this.wander();
    this.bounce();
  }

  terminate() {
    super.terminate();

    this.wandering?.stop();
    this.wandering = undefined;
    this.bouncing?.stop();
    this.bouncing = undefined;
    this.blinking?.remove();
    this.blinking = undefined;
  }

  private bounce() {
    this.bouncing = this.scene.tweens.add({
      targets: this,
      y: this.y + Phaser.Math.RND.pick([-10, -5, 5, 10]),
      duration: 1000,
      yoyo: true,
      repeat: -1,
    });
  }

  private wander() {
    let lastX = 1;
    this.wandering = this.scene.tweens.add({
      targets: this,
      x: this.x + 50,
      duration: 3000,
      yoyo: true,
      repeat: -1,
      onUpdate: () => {
        if (lastX !== this.x) {
          this.flipX = this.x < lastX;
          lastX = this.x;
        }
      },
    });
  }

  private blink(waitFor = 2000) {
    this.blinking = this.scene.time.delayedCall(
      waitFor,
      () => {
        this.anims.play({
          key: 'spike',
          repeat: 1,
        });

        this.blink(Phaser.Math.Between(1000, 5000));
      },
      [],
      this
    );
  }
}

export class Chomper extends Enemy {
  type: EnemyType = 'chomper';
  direction: boolean;
  tween?: Phaser.Tweens.Tween;
  constructor(enemies: Enemies) {
    super(enemies);
    this.direction = false;
    this.pickSprite();
  }

  pickSprite() {
    this.setTexture('jumper_spritesheet', this.direction ? 63 : 64);
  }

  animate() {
    this.wander();
  }

  terminate() {
    super.terminate();

    this.tween?.stop();
    this.tween = undefined;
  }

  wander() {
    this.pickSprite();
    this.tween = this.scene.tweens.add({
      targets: this,
      x: this.x + (this.direction ? -25 : +25),
      duration: 3000,
      onComplete: () => {
        this.direction = !this.direction;
        this.chomp();
      },
    });
  }

  chomp() {
    this.setTexture('jumper_spritesheet', 65);

    const openMouth = once(() => this.setTexture('jumper_spritesheet', 66));

    const originalX = this.x;
    this.tween = this.scene.tweens.add({
      targets: this,
      x: { from: this.x - 1, to: this.x + 1 },
      duration: 50,
      yoyo: true,
      repeat: 14,
      delay: 1000,
      onUpdate: (t) => {
        const v = t.progress;
        if (v > 0.1) {
          openMouth();
        }
      },
      onComplete: () => {
        this.x = originalX;
        this.wander();
      },
    });
  }
}

export class Floater extends Enemy {
  type: EnemyType = 'floater';
  tween?: Phaser.Tweens.Tween;

  constructor(enemies: Enemies) {
    super(enemies);
    this.setTexture('jumper_spritesheet', 67);
  }

  animate() {
    this.moveRandomly();
  }

  terminate() {
    super.terminate();

    this.tween?.stop();
    this.tween = undefined;
  }

  moveRandomly() {
    // pick a random point to float to.
    const offset = 20;
    const x = Phaser.Math.Between(
      offset,
      this.scene.sys.game.canvas.width - offset
    );
    const y = Phaser.Math.Between(this.y - 50, this.y + 50);
    this.tween = this.scene.tweens.add({
      targets: this,
      x,
      y,
      duration: 3000,
      onComplete: () => {
        this.laugh();
      },
    });
  }

  laugh() {
    const openMouth = once(() => {
      this.setTexture('jumper_spritesheet', 69);
    });
    const closeMouth = once(() => {
      this.setTexture('jumper_spritesheet', 68);
    });

    this.setTexture('jumper_spritesheet', 68);
    // bounce up and down
    this.tween = this.scene.tweens.add({
      targets: this,
      y: this.y + 3,
      duration: 150,
      yoyo: true,
      repeat: 6,
      delay: 50,
      onUpdate: (t) => {
        if (t.progress > 0.9) {
          closeMouth();
        } else if (t.progress > 0.1) {
          openMouth();
        }
      },
      onComplete: () => {
        this.moveRandomly();
      },
    });
  }
}
