import { assertNever } from '@worksheets/util/errors';

import { DEPTHS, OUT_OF_BOUNDS } from '../data';
import { PlatformType } from '../types';
import { Observer } from './observer';
import { Player } from './player';

export class PlatformsPool {
  static PREFILL_QUANTITY = {
    basic: 100,
    spring: 20,
    sliding: 20,
    breaking: 20,
    floor: 1,
  };
  scene: Phaser.Scene;
  recycled: Record<PlatformType, Platform[]>;
  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.recycled = {
      basic: [],
      spring: [],
      sliding: [],
      breaking: [],
      floor: [],
    };
  }

  terminate(platform: Platform) {
    const type = platform.type as PlatformType;
    const exists = this.recycled[type].some((p) => p.id === platform.id);
    if (exists) return;

    this.recycled[type].push(platform);
  }

  get(type: PlatformType) {
    const category = this.recycled[type];
    if (category) {
      const platform = category.pop();
      if (platform) {
        return platform;
      }
    }

    return this.create(type);
  }

  prefill() {
    for (const key in this.recycled) {
      const k = key as PlatformType;
      for (let i = 0; i < PlatformsPool.PREFILL_QUANTITY[k]; i++) {
        this.create(k).terminate();
      }
    }
  }

  private create(type: PlatformType) {
    const PlatformConstructor = this.pickConstructor(type);
    return new PlatformConstructor(
      this.scene,
      this,
      OUT_OF_BOUNDS.x,
      OUT_OF_BOUNDS.y
    );
  }

  private pickConstructor(type: PlatformType) {
    switch (type) {
      case 'basic':
        return Platform;
      case 'spring':
        return Spring;
      case 'sliding':
        return SlidingPlatform;
      case 'breaking':
        return BreakingPlatform;
      case 'floor':
        return Floor;
      default:
        throw assertNever(type);
    }
  }

  group() {
    // return the count of each type of platform
    return Object.keys(this.recycled).reduce(
      (acc, type) => ({
        ...acc,
        [type]: this.recycled[type as PlatformType].length,
      }),
      { basic: 0, spring: 0, sliding: 0, breaking: 0, floor: 0 }
    );
  }

  count() {
    return Object.keys(this.recycled).reduce(
      (acc, type) => acc + this.recycled[type as PlatformType].length,
      0
    );
  }
}

export class Platforms extends Phaser.GameObjects.Group {
  static SPAWN_EVENT = 'spawn';
  static SPAWN_RATE = 2;
  static GAP = 12;
  static SCREEN_OFFSET = 200;

  observer: Observer;
  scene: Phaser.Scene;
  height: number;
  width: number;
  pool: PlatformsPool;
  constructor(scene: Phaser.Scene, observer: Observer) {
    super(scene);
    this.scene = scene;
    this.observer = observer;
    this.height = 0;
    this.pool = new PlatformsPool(scene);

    const { width, height } = scene.sys.game.canvas;
    this.width = width;
    this.height = height;

    this.initialize();

    this.spawnPlatforms(height - 100);
  }

  private initialize() {
    this.pool.prefill();
    const { width, height } = this;
    this.add(this.pool.get('floor').place(width / 2, height));
    this.add(this.pool.get('basic').place(width / 2, height / 1.25));
    this.add(this.pool.get('spring').place(width / 2, height / 1.25));
  }

  private spawnPlatforms(height: number) {
    for (let i = 0; i < Platforms.SPAWN_RATE; i++) {
      const y =
        height -
        Phaser.Math.Between(Platforms.GAP * 1, Platforms.GAP * 1.5) * i;
      const x = Phaser.Math.Between(0, this.width);
      this.spawnPlatform(x, y);
      this.height = y;
    }
  }

  private spawnPlatform(x: number, y: number) {
    const type = Phaser.Math.Between(0, 100);
    const generator = (type: PlatformType) =>
      this.add(this.pool.get(type).place(x, y));
    if (type < 15) {
      generator('sliding');
    } else if (type < 25) {
      generator('breaking');
    } else if (type < 30) {
      generator('basic');
      generator('spring');
    } else {
      generator('basic');
      this.emit(Platforms.SPAWN_EVENT, x, y);
    }
  }

  update() {
    if (this.observer.apex < this.height + Platforms.SCREEN_OFFSET) {
      this.spawnPlatforms(this.height - Platforms.GAP);
    }
    // iterate over all children and check if they are out of bounds
    const lowerBound =
      this.observer.main.scrollY + this.scene.sys.game.canvas.height;
    this.children.iterate((platform) => {
      if (platform instanceof Platform) {
        if (platform.y - Platforms.SCREEN_OFFSET > lowerBound) {
          this.remove(platform);
          platform.terminate();
        }
      }
      return true;
    });
  }
}

export class Platform extends Phaser.Physics.Arcade.Sprite {
  type: PlatformType = 'basic';
  pool: PlatformsPool;
  body: Phaser.Physics.Arcade.Body;
  id: string;
  constructor(scene: Phaser.Scene, pool: PlatformsPool, x: number, y: number) {
    super(scene, x, y, 'jumper_spritesheet', 27);
    this.pool = pool;
    this.id = Phaser.Math.RND.uuid();
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setBodySize(8, 2);
    this.setDepth(DEPTHS.PLATFORM);
    if (!(this.body instanceof Phaser.Physics.Arcade.Body)) {
      throw new Error(
        'Expected body to be an instance of Phaser.Physics.Arcade.Body'
      );
    }
    this.body.setImmovable(true);
    this.body.setAllowGravity(false);

    this.body.checkCollision.down = false;
    this.body.checkCollision.left = false;
    this.body.checkCollision.right = false;
  }

  place(x: number, y: number) {
    this.x = x;
    this.y = y;
    return this;
  }

  terminate() {
    this.pool.terminate(this);
  }
}

export class Floor extends Platform {
  type: PlatformType = 'floor';
  constructor(scene: Phaser.Scene, pool: PlatformsPool, x: number, y: number) {
    super(scene, pool, x, y);
    this.scaleX = 20;
  }
}

export class SlidingPlatform extends Platform {
  type: PlatformType = 'sliding';
  tween?: Phaser.Tweens.Tween;
  constructor(scene: Phaser.Scene, pool: PlatformsPool, x: number, y: number) {
    super(scene, pool, x, y);
    this.setTexture('jumper_spritesheet', 29);
  }
  place(x: number, y: number) {
    super.place(x, y);

    this.tween = this.scene.tweens.add({
      targets: this,
      x: x + Phaser.Math.RND.pick([-30, 30]),
      ease: 'Linear',
      duration: 1500,
      yoyo: true,
      repeat: -1,
    });

    return this;
  }

  terminate() {
    super.terminate();
    if (this.tween) {
      this.tween.stop();
      this.tween = undefined;
    }
  }
}

export class BreakingPlatform extends Platform {
  static PARTICLE_QUANTITY = 10;
  type: PlatformType = 'breaking';
  breaking = false;
  constructor(scene: Phaser.Scene, pool: PlatformsPool, x: number, y: number) {
    super(scene, pool, x, y);
    this.setTexture('jumper_spritesheet', 28);
  }

  place(x: number, y: number) {
    super.place(x, y);
    this.breaking = false;
    this.body.checkCollision.none = false;
    this.setVisible(true);
    this.setActive(true);
    return this;
  }

  terminate() {
    super.terminate();
    if (!this.breaking) {
      this.breaking = true;
      this.setVisible(false);
      this.setActive(false);
      this.body.checkCollision.none = true;
    }
  }

  /** The middle of the square for particle emission */
  center() {
    return { x: this.x, y: this.y };
  }
}

export class Spring extends Platform {
  type: PlatformType = 'spring';
  constructor(scene: Phaser.Scene, pool: PlatformsPool, x: number, y: number) {
    super(scene, pool, x, y);
    this.setBodySize(6, 2);
    this.setOffset(5, 3);
    this.setTexture('jumper_spritesheet', 19);
    this.setDepth(DEPTHS.PLATFORM + 1);

    if (scene.anims.get('spring') === undefined) {
      scene.anims.create({
        key: 'spring',
        frames: scene.anims.generateFrameNumbers('jumper_spritesheet', {
          start: 17,
          end: 19,
        }),
        frameRate: 24,
      });
    }
  }

  launch(player: Player) {
    this.playReverse({
      key: 'spring',
      yoyo: true,
    });

    player.jump(1.5);
    player.on('jump', () => {
      this.body.checkCollision.none = true;
      this.body.setAllowGravity(true);
      this.setVelocityY(-50);

      this.scene.time.delayedCall(1000, () => {
        this.terminate();
      });
      player.off('jump');
    });
  }

  terminate() {
    super.terminate();
    this.body.setAllowGravity(false);
    this.setVelocity(0);
  }

  place(x: number, y: number) {
    super.place(x, y);
    this.body.checkCollision.none = false;
    return this;
  }
}
