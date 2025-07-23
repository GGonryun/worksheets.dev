import { CameraObserver } from '@worksheets/phaser/cameras';
import { PositiveWholeNumber, WholeNumber } from '@worksheets/phaser/numbers';
import { CharityGamesPlugin } from '@worksheets/phaser/plugins';
import { Point } from '@worksheets/phaser/types';

import { Car, Cars, CarType } from '../objects/car';
import { GameConfiguration } from '../objects/configuration';
import { Indicator } from '../objects/indicator';
import { Road, RoadDetailLine, RoadDetails, Roads } from '../objects/roads';
import { DEPTHS } from '../settings/data';
import { CheatScene } from './cheat';
import { HudScene } from './hud';

export class GameScene extends Phaser.Scene {
  static Key = 'GameScene';

  server: CharityGamesPlugin;

  configuration: GameConfiguration;
  hudScene: HudScene;
  cameraObserver: CameraObserver;
  finishLineObserver: FinishLineObserver;

  audio: AudioController;
  roads: Roads;
  indicator: Indicator;
  details: RoadDetails;
  cars: Cars;

  constructor() {
    super({
      key: GameScene.Key,
    });
  }

  get centerX() {
    return this.cameras.main.centerX;
  }

  get centerY() {
    return this.cameras.main.centerY;
  }

  create(configuration: GameConfiguration) {
    this.server = CharityGamesPlugin.find(this);
    this.configuration = configuration;

    this.scene.launch(HudScene.Key, { configuration: this.configuration });

    this.cameraObserver = new CameraObserver(this, {
      buffer: WholeNumber.of(64),
    });

    this.hudScene = this.scene.get(HudScene.Key) as HudScene;

    this.audio = new AudioController(this);
    this.roads = new Roads(this, this.cameraObserver);
    this.details = new RoadDetails(this, this.cameraObserver);
    this.cars = new Cars(this);
    this.indicator = new Indicator(this, this.cars.player(), {
      y: -12,
    });

    const camera = this.cameras.main;
    camera.startFollow(this.cars.player(), true, 0.1, 0.1, -8, 64);

    new FinishLine(this, { x: 0, y: -10 });
    new FinishLine(this, { x: 0, y: -this.configuration.targetDistance.value });

    this.finishLineObserver = new FinishLineObserver(this);

    this.input.keyboard?.on('keydown-ESC', () => {
      this.hudScene.bus.emit('cheating-detected');
    });

    this.cameraObserver.bus.on('object-exited', (obj) => {
      if (obj instanceof Road) {
        // move it back up 4 roads
        obj.setPosition(0, obj.y - Road.Size.Height * 5);
      }
    });

    this.cameraObserver.bus.on('object-exited', (obj) => {
      if (obj instanceof RoadDetailLine) {
        obj.reorganize();
        obj.setPosition(0, obj.y - RoadDetailLine.Height * 18);
      }
    });

    this.hudScene.bus.on('speed-update', (type, speed) => {
      this.cars.setSpeed(type, speed);
    });

    this.hudScene.bus.on('cheating-detected', () => {
      this.scene.pause();
      this.hudScene.scene.stop();
      this.scene.launch(CheatScene.Key);
      this.sound.stopAll();
      this.sound.play('audio-crash-1');
      this.server.achievements.unlock(['tap-racing:cheater']);
    });

    this.hudScene.bus.on('finish-race', (carType) => {
      if (carType === this.configuration.player) {
        this.time.delayedCall(200, () => {
          camera.stopFollow();
          this.audio.stop();
        });
      }
    });

    this.hudScene.bus.on('begin-race', () => {
      this.audio.start();
      this.audio.shift();
    });

    this.hudScene.bus.on('click', () => {
      this.audio.shift();
    });
  }

  update() {
    this.cameraObserver.update();
    this.cars.update();
    this.finishLineObserver.update();
    this.indicator.update();
  }
}

class FinishLineObserver {
  finished: CarType[];
  player: Car;
  offsetY: PositiveWholeNumber;
  constructor(private scene: GameScene) {
    this.player = scene.cars.player();
    this.finished = [];
    this.offsetY = PositiveWholeNumber.of(0);
  }

  update() {
    if (this.finished.length > 3) return;
    for (const car of this.scene.cars.iterate()) {
      if (this.finished.includes(car.type)) continue;
      if (
        car.y <=
        -this.scene.configuration.targetDistance.value - this.offsetY.value
      ) {
        this.finished.push(car.type);
        if (this.finished.includes(this.scene.configuration.player)) {
          this.scene.audio.woosh();
        }
        this.scene.hudScene.bus.emit('finish-race', car.type);
      }
    }
  }
}

class FinishLine extends Phaser.GameObjects.Container {
  scene: GameScene;
  constructor(scene: GameScene, point: Point) {
    super(scene, point.x, point.y);
    this.scene = scene;
    scene.add.existing(this);
    this.setDepth(DEPTHS.FINISH);

    const xs = [-14, 2, 14];

    for (const x of xs) {
      this.add(new Phaser.GameObjects.Sprite(scene, x, 0, 'road-props', 7));
    }
  }
}

class AudioController {
  gear: number;
  count: number;

  gearSound:
    | Phaser.Sound.NoAudioSound
    | Phaser.Sound.HTML5AudioSound
    | Phaser.Sound.WebAudioSound;
  loopSound:
    | Phaser.Sound.NoAudioSound
    | Phaser.Sound.HTML5AudioSound
    | Phaser.Sound.WebAudioSound;

  constructor(private scene: GameScene) {
    scene.sound.play('audio-loop-0', {
      loop: true,
      volume: 0.4,
    });
    this.gear = 0;
    this.count = 0;
  }

  start() {
    this.scene.sound.play('audio-screech-1', {
      volume: 0.4,
      rate: 1.26,
    });
  }

  shift() {
    if (this.gear >= this.scene.configuration.maxGear.value) {
      return;
    }
    const threshold = this.scene.configuration.gearThreshold.value;
    if (this.count % threshold === 0) {
      this.scene.sound.stopByKey(`audio-loop-${this.gear}`);
      this.gearSound = this.scene.sound.add(`audio-gear-${this.gear}`);
      this.loopSound = this.scene.sound.add(`audio-loop-${this.gear + 1}`);
      this.gearSound.play();
      this.loopSound.play({ loop: true });

      this.gear++;
      this.count = 1;
    } else {
      const value = this.count / threshold;
      this.loopSound.setRate(this.semitoneToRate(value * 4));
      this.count++;
    }
  }

  semitoneToRate(semitones: number) {
    return Math.pow(2, semitones / 12);
  }

  stop() {
    this.scene.tweens.add({
      targets: { volume: 1 }, // proxy object
      volume: 0,
      duration: 1000, // 1 second fade
      ease: 'Linear',
      onUpdate: (tween) => {
        const value = tween.getValue();
        this.loopSound.setVolume(value);
      },
      onComplete: () => {
        this.loopSound.stop(); // optional: stop when fully faded out
      },
    });
  }

  woosh() {
    this.scene.sound.play('audio-woosh-1', {
      seek: 2.25,
    });
  }
}
