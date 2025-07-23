import { TypedEventEmitter } from '@worksheets/phaser/events';
import {
  PositiveNumber,
  PositiveWholeNumber,
} from '@worksheets/phaser/numbers';
import { CharityGamesPlugin } from '@worksheets/phaser/plugins';
import { Point } from '@worksheets/phaser/types';
import { fill } from '@worksheets/util/arrays';
import { SECONDS } from '@worksheets/util/time';

import { CarType } from '../objects/car';
import { GameConfiguration } from '../objects/configuration';
import { Indicator } from '../objects/indicator';
import { PlayerPortrait } from '../objects/portrait';
import { PixelTypography } from '../objects/typography';
import { SLATE_COLOR } from '../settings/colors';
import { CAR_SPRITES, STORAGE_KEY } from '../settings/data';
import { padScore } from '../util';
import { GameScene } from './game';
import { MenuScene } from './menu';

type HudSceneOptions = {
  configuration: GameConfiguration;
};
export class HudScene extends Phaser.Scene {
  static Key = 'HudScene';
  server: CharityGamesPlugin;

  options: HudSceneOptions;
  progress: Progress;
  playerController: PlayerController;
  enemyController: EnemyController;
  indicator: Indicator;
  instructions: Instructions;
  view: PlayerView;
  gameOver: GameOver;

  bus: TypedEventEmitter<{
    'clicks-per-second': [PositiveWholeNumber];
    'speed-update': [CarType, PositiveWholeNumber];
    'car-position': [CarType, PositiveWholeNumber];
    click: [];
    'cheating-detected': [];
    'begin-race': [];
    'finish-race': [CarType];
  }>;
  constructor() {
    super({
      key: HudScene.Key,
    });
    this.bus = new TypedEventEmitter();
  }

  create(options: HudSceneOptions) {
    this.server = CharityGamesPlugin.find(this);
    this.options = options;

    this.view = new PlayerView(this);

    this.bus.on('car-position', (key, position) => {
      this.progress.cars.set(key, position);
    });

    this.bus.on('begin-race', () => {
      this.playerController.start();
      this.enemyController.start();
      this.view.start();
    });

    this.bus.on('finish-race', (carType) => {
      if (carType === this.options.configuration.player) {
        this.view.stop();
        this.playerController.stop();
        this.enemyController.stop();

        this.time.delayedCall(1000, () => {
          this.gameOver.start();
        });
      }
    });

    this.bus.on('click', () => {
      this.options.configuration.clicks =
        this.options.configuration.clicks.plus(1);
      this.options.configuration.clickPower =
        this.options.configuration.clickPower.plus(
          this.options.configuration.clickPowerGrowth.value
        );
    });

    this.instructions = new Instructions(this);
    this.playerController = new PlayerController(this);
    this.enemyController = new EnemyController(this);
    this.progress = new Progress(this);
    this.gameOver = new GameOver(this);
  }

  update(_: unknown, delta: number) {
    this.playerController.update();
    this.progress.update();
    this.view.update(delta);
  }
}

class PlayerView extends Phaser.GameObjects.Container {
  speed: Speed;
  seconds: Seconds;
  fuel: Fuel;
  portrait: PlayerPortrait;
  constructor(scene: HudScene) {
    super(scene, scene.cameras.main.width - 16, scene.cameras.main.centerY);
    scene.add.existing(this);

    this.add(new Phaser.GameObjects.Sprite(scene, 0, 0, 'ui-main'));
    this.fuel = new Fuel(scene, { x: 8, y: 52 });
    this.add(this.fuel);

    this.speed = new Speed(scene, { x: -4, y: 5 });
    this.add(this.speed);

    this.seconds = new Seconds(scene, { x: -12, y: -18 });
    this.add(this.seconds);

    scene.bus.on('clicks-per-second', (cps) => {
      this.speed.set(cps.value);
    });

    this.portrait = new PlayerPortrait(scene, {
      type: scene.options.configuration.player,
      x: 0,
      y: -56,
    });
    this.add(this.portrait);
  }

  start() {
    this.portrait.start();
    this.seconds.start();
    this.speed.start();
    this.fuel.start();
  }

  update(delta: number) {
    this.seconds.update(delta);
    this.fuel.update(delta);
  }

  stop() {
    this.fuel.stop();
    this.seconds.stop();
    this.speed.stop();
    this.portrait.stop();
  }
}

class Seconds extends Phaser.GameObjects.Container {
  declare scene: HudScene;
  duration: PositiveNumber;
  enabled: boolean;
  sprites: Phaser.GameObjects.Sprite[];
  dot: Phaser.GameObjects.Text;
  constructor(scene: HudScene, point: Point) {
    super(scene, point.x, point.y);
    scene.add.existing(this);
    this.duration = PositiveNumber.of(0);
    this.enabled = false;

    this.sprites = fill(4, (i) => {
      return new Phaser.GameObjects.Sprite(scene, i * 8, 0, 'ui-speed', 0);
    });
    this.sprites.forEach((s) => this.add(s));
    this.dot = new PixelTypography(scene, {
      x: 13,
      y: 0,
      text: '.',
      color: 'sky-blue',
    });
    this.add(this.dot);
  }

  start() {
    this.enabled = true;
  }

  update(delta: number) {
    if (!this.enabled) return;

    this.duration = PositiveNumber.of(this.duration.value + delta);
    this.scene.options.configuration.duration = this.duration.clone();
    this.setSeconds();
  }

  setSeconds() {
    const ms = this.duration.value;
    let value = Math.floor((ms % 60000) / 10);
    for (let i = 0; i < 4; i++) {
      const digit = value % 10;
      this.sprites[3 - i].setFrame(digit);
      value = Math.floor(value / 10);
    }
  }

  stop() {
    this.enabled = false;
  }
}

class Progress extends Phaser.GameObjects.Container {
  static StartY = 16;
  static EndY = 160;
  cars: Cars;
  indicator: Indicator;
  constructor(scene: HudScene) {
    super(scene);
    scene.add.existing(this);
    this.setPosition(10, 0);
    this.add(new Flag(scene));
    this.add(new Start(scene));

    this.cars = new Cars(scene);
    this.add(this.cars);

    this.indicator = new Indicator(scene, this.cars.player(), {
      x: 0,
      y: -6,
    });
    this.add(this.indicator);
  }

  update() {
    this.indicator.update();
  }
}

class Flag extends Phaser.GameObjects.Container {
  constructor(scene: HudScene) {
    super(scene);
    fill(4, (index) => {
      const sprite = new Phaser.GameObjects.Sprite(
        scene,
        index * 8,
        Progress.StartY,
        'ui-progress',
        0
      );
      this.add(sprite);
    });
  }
}

class Start extends Phaser.GameObjects.Container {
  constructor(scene: HudScene) {
    super(scene);
    scene.add.existing(this);
    fill(4, (i) => {
      const sprite = new Phaser.GameObjects.Sprite(
        scene,
        i * 8,
        0,
        'ui-progress',
        12 + i
      );
      this.add(sprite);
    });

    this.setPosition(0, Progress.EndY);
  }
}

class Cars extends Phaser.GameObjects.Container {
  declare scene: HudScene;

  positions: Map<CarType, PositiveWholeNumber>;
  sprites: Map<CarType, Phaser.GameObjects.Sprite>;

  constructor(scene: HudScene) {
    super(scene);
    scene.add.existing(this);
    this.positions = new Map();
    this.sprites = new Map();

    fill(4, (i) => {
      const sprite = new Phaser.GameObjects.Sprite(
        scene,
        i * 8,
        0,
        'ui-progress',
        4 + i
      );
      this.add(sprite);
      this.sprites.set(CAR_SPRITES[i], sprite);
      this.set(CAR_SPRITES[i], PositiveWholeNumber.of(0));
    });
  }

  player() {
    const sprite = this.sprites.get(this.scene.options.configuration.player);
    if (sprite) return sprite;
    throw new Error('Player sprite not found');
  }

  set(key: CarType, position: PositiveWholeNumber) {
    this.positions.set(key, position);
    const sprite = this.sprites.get(key);
    if (!sprite) throw new Error('Sprite not found');

    const progress =
      position.value / this.scene.options.configuration.targetDistance.value;
    const y = Phaser.Math.Linear(Progress.EndY, Progress.StartY, progress);
    sprite.y = y;
  }
}

class Speed extends Phaser.GameObjects.Container {
  scene: HudScene;
  digits: Phaser.GameObjects.Sprite[];
  window: number[];
  enabled: boolean;
  constructor(scene: HudScene, point: Point) {
    super(scene, point.x, point.y);
    this.scene = scene;
    this.enabled = false;

    const size = 8;
    this.digits = fill(3, (index) => {
      return new Phaser.GameObjects.Sprite(
        scene,
        index * size,
        0,
        'ui-speed',
        0
      );
    });
    this.digits.forEach((d) => this.add(d));
    this.window = fill(10, () => 0);
  }

  start() {
    this.enabled = true;
  }

  stop() {
    this.enabled = false;
  }

  set(value: number) {
    if (!this.enabled) return;

    const configuration = this.scene.options.configuration;
    this.window.push(value);
    this.window = this.window.slice(-10);

    const cps = this.window.reduce((a, b) => a + b, 0) / this.window.length;
    const raw =
      configuration.minimumSpeed.value + cps * configuration.clickPower.value;
    let speed = Phaser.Math.Clamp(
      Math.floor(raw),
      configuration.minimumSpeed.value,
      999
    );
    const whole = PositiveWholeNumber.of(speed);

    this.scene.bus.emit('speed-update', configuration.player, whole);

    configuration.topSpeed = PositiveWholeNumber.max(
      configuration.topSpeed,
      whole
    );

    for (let i = 0; i < 3; i++) {
      const digit = speed % 10;
      this.digits[2 - i].setFrame(digit);
      speed = Math.floor(speed / 10);
    }
  }
}

class Fuel extends Phaser.GameObjects.Container {
  enabled: boolean;
  duration: number;
  progress: number;
  maskShape: Phaser.GameObjects.Rectangle;
  maskShapeHeight = 48;

  constructor(scene: HudScene, point: Point) {
    super(scene);
    scene.add.existing(this);
    this.enabled = false;
    this.duration = scene.options.configuration.maxFuel.value * SECONDS;
    this.progress = this.duration;

    const sprite = new Phaser.GameObjects.Sprite(
      scene,
      point.x,
      point.y,
      'ui-fuel',
      0
    );
    this.add(sprite);

    this.createMask();
  }

  createMask() {
    this.maskShape = new Phaser.GameObjects.Rectangle(
      this.scene,
      197,
      164,
      6,
      this.maskShapeHeight,
      0xff0000
    )
      .setOrigin(0, 1)
      .setVisible(false);
    this.scene.add.existing(this.maskShape);

    const mask = this.maskShape.createGeometryMask();

    this.setMask(mask);
  }

  start() {
    this.enabled = true;
  }

  stop() {
    this.enabled = false;
  }

  update(delta: number) {
    if (!this.enabled) return;
    this.progress = Math.max(0, this.progress - delta);
    const percentage = this.progress / this.duration;
    const height = this.maskShapeHeight * percentage;
    this.maskShape.height = height;
    this.maskShape.setOrigin(0, 1);
  }
}

class PlayerController {
  clicks: number[];
  enabled: boolean;
  constructor(private scene: HudScene) {
    this.clicks = [];
    this.enabled = false;

    this.scene.input.on('pointerdown', () => {
      if (!this.enabled) return;
      const now = performance.now();
      this.clicks.push(now);
      this.scene.bus.emit('click');
    });

    this.scene.time.addEvent({
      delay: 100,
      loop: true,
      callback: () => {
        if (!this.enabled) return;
        if (this.isLikelyCheating()) {
          this.scene.bus.emit('cheating-detected');
          this.clicks = [];
          return;
        }

        this.scene.bus.emit(
          'clicks-per-second',
          PositiveWholeNumber.of(this.clicks.length)
        );
      },
      callbackScope: this,
    });
  }

  start() {
    this.enabled = true;
  }

  stop() {
    this.enabled = false;
  }

  isLikelyCheating(): boolean {
    const clicks = this.clicks;
    if (clicks.length < 5) return false;

    const cps = clicks.length / 3;
    const intervals = clicks.slice(1).map((t, i) => t - clicks[i]);

    const avg = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const stdDev = Math.sqrt(
      intervals.reduce((sum, x) => sum + (x - avg) ** 2, 0) / intervals.length
    );
    const unique = new Set(intervals.map((i) => Math.round(i)));

    return (
      cps > 15 || // Too fast
      (stdDev < 5 && cps > 10) || // Too consistent and fast
      (unique.size <= 2 && cps > 8) // Repetitive patterns
    );
  }

  update() {
    if (!this.enabled) return;
    const now = performance.now();
    const threshold = 3000;
    this.clicks = this.clicks.filter((t) => now - t < threshold);
  }
}

class EnemyController {
  timer: Phaser.Time.TimerEvent;
  constructor(private scene: HudScene) {}
  start() {
    const enemies = CAR_SPRITES.filter(
      (s) => s !== this.scene.options.configuration.player
    );

    for (const enemy of enemies) {
      this.move(enemy);
    }

    this.timer = this.scene.time.addEvent({
      delay: 500,
      repeat: -1,
      callback: () => this.move(Phaser.Math.RND.pick(enemies)),
      callbackScope: this,
    });
  }

  stop() {
    if (!this.timer) return;
    this.timer.remove();
  }

  move(enemy: CarType) {
    const min = this.scene.options.configuration.enemySpeeds.minimum;
    const max = this.scene.options.configuration.enemySpeeds.maximum;
    const speed = Phaser.Math.RND.between(min.value, max.value);
    this.scene.bus.emit('speed-update', enemy, PositiveWholeNumber.of(speed));
  }
}

const MODAL_OFFSET_X = -14;
class Instructions extends Phaser.GameObjects.Container {
  declare scene: HudScene;

  constructor(scene: HudScene) {
    super(
      scene,
      scene.cameras.main.centerX + MODAL_OFFSET_X,
      scene.cameras.main.centerY
    );

    const bg = scene.add.rectangle(0, 0, 128, 60, SLATE_COLOR.color);

    const title = scene.add.existing(
      new PixelTypography(scene, {
        x: 0,
        y: -20,
        text: 'TAP TO START',
      })
    );
    const instructions = scene.add.existing(
      new PixelTypography(scene, {
        x: 0,
        y: 20,
        text: 'TAP FAST TO WIN',
      })
    );

    const lights = scene.add.sprite(0, 0, 'ui-lights').setScale(3);

    this.add([bg, title, instructions, lights]);
    scene.add.existing(this);

    this.scene.input.on('pointerdown', this.beginRace, this);
  }

  beginRace() {
    this.scene.bus.emit('begin-race');
    this.setVisible(false);
    this.scene.input.off('pointerdown', this.beginRace, this);
  }
}

class GameOver extends Phaser.GameObjects.Container {
  declare scene: HudScene;
  speed: PixelTypography;

  constructor(scene: HudScene) {
    super(
      scene,
      scene.cameras.main.centerX + MODAL_OFFSET_X,
      scene.cameras.main.centerY
    );
    this.setVisible(false);

    const bg = scene.add.rectangle(0, 0, 128, 96, SLATE_COLOR.color);

    const title = new PixelTypography(scene, {
      x: 0,
      y: -32,
      text: 'RACE COMPLETE!',
    });

    this.speed = new PixelTypography(scene, {
      x: 0,
      y: -8,
      text: `SEC: 00.00`,
      color: 'sky-blue',
    });

    const restart = new PixelTypography(scene, {
      x: 0,
      y: 32,
      text: 'TAP TO RESTART',
    });

    const portrait = new PlayerPortrait(scene, {
      x: 0,
      y: 0,
      type: scene.options.configuration.player,
    }).start();

    this.scene.input.on('pointerdown', () => {
      if (!this.visible) return;
      scene.scene.stop(HudScene.Key);
      scene.scene.stop(GameScene.Key);
      scene.scene.start(MenuScene.Key);
      scene.sound.stopAll();
      scene.sound.play('audio-gear-3');
    });

    this.add([bg, title, restart, portrait, this.speed]);
    scene.add.existing(this);
  }

  start() {
    this.setVisible(true);
    this.speed.setText(
      `SEC: ${padScore(this.scene.options.configuration.duration.value)}`
    );
    this.submit();
  }

  submit() {
    const topSpeed = this.scene.options.configuration.topSpeed.clone().value;

    const { current, best } = this.setHighScore();
    const clicks = this.setTotalClicks();
    const races = this.setTotalRaces();

    this.scene.server.storage.save();

    this.submitAchievements({ best, clicks, races, topSpeed });

    this.scene.server.leaderboard.submit(current);
  }

  setHighScore() {
    const current = this.scene.options.configuration.duration.clone().value;
    const saved = this.scene.server.storage.get(STORAGE_KEY.HIGH_SCORE, 99990);
    const best = Math.round(Math.min(current, saved));
    this.scene.server.storage.set(STORAGE_KEY.HIGH_SCORE, best);
    return { current, best: best };
  }

  setTotalClicks() {
    const now = Math.round(
      this.scene.options.configuration.clicks.clone().value
    );
    return this.scene.server.storage.set(
      STORAGE_KEY.TOTAL_CLICKS,
      (prev) => prev + now,
      0
    );
  }

  setTotalRaces() {
    return this.scene.server.storage.set(
      STORAGE_KEY.TOTAL_RACES,
      (prev) => prev + 1,
      0
    );
  }

  submitAchievements({
    best,
    clicks,
    races,
    topSpeed,
  }: {
    races: number;
    best: number;
    clicks: number;
    topSpeed: number;
  }) {
    const achievements: string[] = [];

    best <= 12500 && achievements.push('tap-racing:best-12500');
    best <= 15000 && achievements.push('tap-racing:best-15000');
    clicks >= 1000 && achievements.push('tap-racing:clicks-1000');
    clicks >= 5000 && achievements.push('tap-racing:clicks-5000');
    clicks >= 10000 && achievements.push('tap-racing:clicks-10000');
    races >= 5 && achievements.push('tap-racing:races-10');
    races >= 50 && achievements.push('tap-racing:races-50');
    races >= 100 && achievements.push('tap-racing:races-100');
    topSpeed >= 200 && achievements.push('tap-racing:speed-200');
    topSpeed >= 250 && achievements.push('tap-racing:speed-250');

    this.scene.server.achievements.unlock(achievements);
  }
}
