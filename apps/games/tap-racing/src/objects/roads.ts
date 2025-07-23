import { CameraObserver } from '@worksheets/phaser/cameras';
import {
  ObjectFactory,
  ObjectPool,
  Poolable,
} from '@worksheets/phaser/objects';
import { Point } from '@worksheets/phaser/types';
import { fill } from '@worksheets/util/arrays';

import { DEPTHS } from '../settings/data';

export class Roads extends Phaser.GameObjects.Group {
  pool: ObjectPool<Road>;

  constructor(scene: Phaser.Scene, observer?: CameraObserver) {
    super(scene);
    this.pool = new ObjectPool(new RoadFactory(scene, observer));

    fill(5).forEach((n) =>
      this.place({
        x: 0,
        y: -n * Road.Size.Height,
      })
    );
  }

  place(options: Point) {
    const road = this.pool.acquire();
    road.setPosition(options.x, options.y);
  }
}

class RoadFactory implements ObjectFactory<Road> {
  scene: Phaser.Scene;
  observer?: CameraObserver;
  constructor(scene: Phaser.Scene, observer?: CameraObserver) {
    this.scene = scene;
    this.observer = observer;
  }

  create() {
    return new Road(this);
  }
}

export class Road extends Phaser.GameObjects.Sprite implements Poolable {
  static Size = { Height: 64 };
  observer?: CameraObserver;
  constructor({ scene, observer }: RoadFactory) {
    const texture = 'road-summer';
    const frame = 0;
    super(scene, 0, 0, texture, frame);

    this.observer = observer;

    this.setDepth(DEPTHS.ROAD);

    this.scene.add.existing(this);
  }

  onAcquire() {
    this.observer?.register(this);
    this.setActive(true);
    this.setVisible(true);
  }

  onRelease() {
    this.observer?.unregister(this);
    this.setActive(false);
    this.setVisible(false);
  }

  onDestroy(): void {
    this.observer?.unregister(this);
    this.destroy();
  }
}

export class RoadDetailFactory {
  scene: Phaser.Scene;
  observer?: CameraObserver;
  constructor(scene: Phaser.Scene, observer?: CameraObserver) {
    this.scene = scene;
    this.observer = observer;
  }

  create() {
    const detail = new RoadDetailLine(this.scene);
    this.observer?.register(detail);
    return detail;
  }
}

export class RoadDetails extends Phaser.GameObjects.Group {
  factory: RoadDetailFactory;

  constructor(scene: Phaser.Scene, observer?: CameraObserver) {
    super(scene);

    this.factory = new RoadDetailFactory(scene, observer);
    fill(18, (i) => {
      this.factory.create().setPosition(0, 16 - RoadDetailLine.Height * i);
    });
  }
}

export class RoadDetailLine extends Phaser.GameObjects.Container {
  static Height = 16;
  declare scene: Phaser.Scene;
  sprites: Phaser.GameObjects.Sprite[];
  constructor(scene: Phaser.Scene) {
    super(scene);
    this.scene = scene;
    this.sprites = [];

    this.setDepth(DEPTHS.DETAILS);

    this.scene.add.existing(this);

    this.#initialize();
  }

  #initialize() {
    const base = 36;
    const width = 16;
    const left = fill(6, (i) => -base - i * width);
    const right = fill(9, (i) => base + i * width);

    [...left, ...right].forEach((x) => {
      const sprite = new Phaser.GameObjects.Sprite(
        this.scene,
        x,
        0,
        'road-details',
        this.randomFrame()
      );
      this.sprites.push(sprite);
      this.add(sprite);
    });
  }

  randomFrame() {
    return Phaser.Math.RND.pick([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 3]);
  }

  reorganize() {
    for (const sprite of this.sprites) {
      sprite.setFrame(this.randomFrame());
    }
  }
}
