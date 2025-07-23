import { AudioButton } from '@worksheets/phaser/audio';
import { CameraObserver } from '@worksheets/phaser/cameras';
import { WholeNumber } from '@worksheets/phaser/numbers';
import { CharityGamesPlugin, OutlinePlugin } from '@worksheets/phaser/plugins';
import { Point } from '@worksheets/phaser/types';

import { Car } from '../objects/car';
import { RoadDetails, Roads } from '../objects/roads';
import { SLATE_COLOR } from '../settings/colors';
import { CAR_SPRITES, DEPTHS, STORAGE_KEY } from '../settings/data';
import { CharactersScene } from './characters';
import { CreditsScene } from './credits';

export class MenuScene extends Phaser.Scene {
  static Key = 'MenuScene';

  server: CharityGamesPlugin;
  outline: OutlinePlugin;

  roads: Roads;
  details: RoadDetails;
  cars: CarFactory;

  constructor() {
    super({
      key: MenuScene.Key,
    });
  }

  create() {
    this.outline = new OutlinePlugin(this);
    this.server = CharityGamesPlugin.find(this);

    this.roads = new Roads(this);
    this.details = new RoadDetails(this);
    this.cars = new CarFactory(this);

    const camera = this.cameras.main;
    camera.setScroll(-64, -158);

    new CharityGamesLogo(this, {
      x: -46,
      y: -142,
    });

    const credits = new CreditsIcon(this, {
      x: -46,
      y: 0,
    });
    this.outline.register(credits, SLATE_COLOR, 2);

    const audio = new AudioButton(this, {
      server: this.server,
      storageKey: STORAGE_KEY.MUTED,
      offTexture: 'icons-sound-off',
      onTexture: 'icons-sound-on',
      audio: 'audio-click',
      x: -46,
      y: -24,
    }).setDepth(DEPTHS.UI);
    this.outline.register(audio, SLATE_COLOR, 2);

    this.scene.launch(CharactersScene.Key);
  }

  update() {
    this.cars.update();
  }
}

class CreditsIcon extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, point: Point) {
    super(scene, point.x, point.y, 'icons-question');
    scene.add.existing(this);
    this.setDepth(DEPTHS.UI);

    this.setInteractive();
    this.on('pointerup', () => {
      scene.scene.stop(CharactersScene.Key);
      scene.scene.launch(CreditsScene.Key);
      scene.sound.play('audio-click');
    });
  }
}

class CarFactory {
  cars: Car[];
  observer: CameraObserver;

  constructor(scene: Phaser.Scene) {
    this.observer = new CameraObserver(scene, {
      buffer: WholeNumber.of(8),
    });
    this.cars = [
      new Car(scene, {
        type: 'red',
        lane: 3,
        velocity: 0.016,
        speed: 64,
      }),
      new Car(scene, {
        type: 'yellow',
        lane: 0,
        velocity: 0.016,
        speed: 32,
      }),
      new Car(scene, {
        type: 'blue',
        lane: 1,
        velocity: 0.016,
        speed: 72,
      }),
    ];

    this.observer.bus.on('object-exited', (car) => {
      if (car instanceof Car) {
        car.setY(64);
        car.setSpeed(Phaser.Math.Between(32, 72));

        const types = CAR_SPRITES.filter(
          (type) => !this.cars.map((c) => c.type).includes(type)
        );
        car.setType(Phaser.Math.RND.pick(types));

        const lanes = [0, 1, 2, 3].filter(
          (lane) => !this.cars.map((c) => c.lane).includes(lane)
        );
        car.setLane(Phaser.Math.RND.pick(lanes));
      }
    });

    this.cars.forEach((car) => this.observer.register(car));
  }

  update() {
    this.cars.forEach((car) => car.update());
    this.observer.update();
  }
}

class CharityGamesLogo extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, point: Point) {
    super(scene, point.x, point.y, 'charity-games');
    scene.add.existing(this);
    this.setDepth(DEPTHS.UI);

    this.setInteractive();
    this.on('pointerup', () => {
      window.open('https://charity.games', '_blank');
    });
  }
}
