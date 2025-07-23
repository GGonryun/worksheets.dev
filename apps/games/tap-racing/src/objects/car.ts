import { TypedEventEmitter } from '@worksheets/phaser/events';
import { PositiveWholeNumber } from '@worksheets/phaser/numbers';
import { fill } from '@worksheets/util/arrays';

import { GameScene } from '../scenes/game';
import { CAR_SPRITES, DEPTHS } from '../settings/data';

export type CarType = 'red' | 'blue' | 'green' | 'yellow' | 'police';
export type CarOptions = {
  type: CarType;
  lane: number;
  velocity: number;
  speed: number;
};

export class Cars {
  scene: GameScene;
  racers: Map<CarType, Car>;
  constructor(scene: GameScene) {
    this.scene = scene;
    this.racers = new Map<CarType, Car>();

    fill(4, (i) => {
      const car = new Car(scene, {
        type: CAR_SPRITES[i],
        lane: i,
        velocity: this.scene.configuration.speedMultiplier.value,
        speed: 0,
      });
      car.bus.on('position-changed', (type, y) => {
        this.scene.hudScene.bus.emit(
          'car-position',
          type,
          PositiveWholeNumber.round(-y)
        );
      });
      this.racers.set(car.type, car);
      scene.add.existing(car);
    });
  }

  player() {
    const player = this.racers.get(this.scene.configuration.player);
    if (!player) {
      throw new Error('Player car not found');
    }
    return player;
  }

  *iterate() {
    for (const car of this.racers.values()) {
      yield car;
    }
  }

  setSpeed(key: CarType, speed: PositiveWholeNumber) {
    const car = this.racers.get(key);
    if (!car) {
      throw new Error('Car not found');
    }
    car.setSpeed(speed.value);
  }

  update() {
    this.racers.forEach((car) => car.update());
  }
}

export class Car extends Phaser.GameObjects.Sprite {
  static Lanes = [-18, -7, 6, 17];

  declare type: CarType;
  private speed: number;
  velocity: number;
  lane: number;
  bus: TypedEventEmitter<{ 'position-changed': [CarType, number] }>;
  constructor(scene: Phaser.Scene, options: CarOptions) {
    const frame = 0;
    const key = `car-${options.type}`;

    super(scene, 0, 0, key, frame);

    scene.add.existing(this);
    this.bus = new TypedEventEmitter();
    this.speed = options.speed;
    this.velocity = options.velocity;
    this.setType(options.type);
    this.setLane(options.lane);
    this.setDepth(DEPTHS.CAR);
  }

  setLane(i: number) {
    if (i < 0 || i >= Car.Lanes.length) {
      throw new Error('Invalid lane index');
    }
    this.setX(Car.Lanes[i]);
    this.lane = i;
  }

  setType(type: CarType) {
    this.type = type;
    this.setTexture(`car-${type}`);
  }

  setSpeed(speed: number) {
    this.speed = speed;
  }

  update() {
    this.y -= this.speed * this.velocity;
    this.bus.emit('position-changed', this.type, this.y);
  }
}
