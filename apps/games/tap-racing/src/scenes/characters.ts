import { TypedEventEmitter } from '@worksheets/phaser/events';
import { CharityGamesPlugin } from '@worksheets/phaser/plugins';
import { Point } from '@worksheets/phaser/types';

import { CarType } from '../objects/car';
import { GameConfiguration } from '../objects/configuration';
import { PixelTypography } from '../objects/typography';
import { SLATE_COLOR } from '../settings/colors';
import {
  CAR_SPRITES,
  DEPTHS,
  MENU_ORIGIN,
  STORAGE_KEY,
} from '../settings/data';
import { padScore } from '../util';
import { GameScene } from './game';

export class CharactersScene extends Phaser.Scene {
  static Key = 'CharactersScene';
  server: CharityGamesPlugin;
  bus: TypedEventEmitter<{
    'character-select': [CarType];
  }>;
  menu: MainMenu;
  selection: CarType;

  constructor() {
    super({
      key: CharactersScene.Key,
    });
  }

  create() {
    this.server = CharityGamesPlugin.find(this);
    this.bus = new TypedEventEmitter();
    this.menu = new MainMenu(this, MENU_ORIGIN);

    this.bus.on('character-select', (key) => {
      const sprite = this.menu.characters.getSprite(key);
      if (sprite) {
        this.menu.indicator.setPosition(sprite.x, sprite.y - 6);
        this.selection = key;
      }
    });

    this.bus.emit('character-select', CAR_SPRITES[0]);
  }
}

class MainMenu extends Phaser.GameObjects.Container {
  characters: Characters;
  indicator: Selection;
  constructor(scene: CharactersScene, point: Point) {
    super(scene);
    scene.add.existing(this);
    this.setDepth(DEPTHS.UI);
    this.setPosition(point.x, point.y);

    this.add(new Background(scene, { x: 0, y: 0 }));
    this.add(new Title(scene, { x: 0, y: -32 }));
    this.add(new PlayButton(scene, { x: 0, y: 32 }));
    this.add(new BestScore(scene, { x: 0, y: 48 }));

    this.indicator = new Selection(scene);
    this.add(this.indicator);

    this.characters = new Characters(scene, { x: 0, y: 8 });
    this.add(this.characters);
  }
}

class Background extends Phaser.GameObjects.Rectangle {
  constructor(scene: Phaser.Scene, point: Point) {
    super(scene, point.x, point.y, 96, 120, SLATE_COLOR.color, 0.9);
    scene.add.existing(this);
    this.setDepth(DEPTHS.UI);
    this.setOrigin(0.5);
  }
}

class Characters extends Phaser.GameObjects.Container {
  constructor(scene: CharactersScene, point: Point) {
    super(scene, point.x, point.y);
    scene.add.existing(this);

    CAR_SPRITES.forEach((key, i) => {
      const sprite = new Phaser.GameObjects.Sprite(
        scene,
        (i - 1.5) * 24,
        0,
        this.toTexture(key)
      )
        .setInteractive({ cursor: 'pointer' })
        .on('pointerdown', () => {
          scene.bus.emit('character-select', key);
          scene.sound.play('audio-gear-1');
        });
      this.add(sprite);
    });
  }

  toTexture(key: CarType) {
    return `car-${key}`;
  }

  getSprite(key: CarType) {
    return this.list.find(
      (child) =>
        child instanceof Phaser.GameObjects.Sprite &&
        child.texture.key === this.toTexture(key)
    ) as Phaser.GameObjects.Sprite;
  }
}

class Selection extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0, 'ui-indicator');
    scene.add.existing(this);
    this.setOrigin(0.5);
    scene.tweens.add({
      targets: this,
      y: '+=4',
      duration: 300,
      yoyo: true,
      ease: Phaser.Math.Easing.Sine.InOut,
      repeat: -1,
    });
  }
}

class Title extends PixelTypography {
  constructor(scene: Phaser.Scene, point: Point) {
    super(scene, { ...point, text: 'TAP RACING' });
  }
}

class PlayButton extends PixelTypography {
  constructor(scene: CharactersScene, point: Point) {
    super(scene, {
      ...point,
      text: 'PLAY',
      onClick: () => {
        scene.sound.play('audio-gear-1');
        scene.scene.start(
          GameScene.Key,
          new GameConfiguration(scene.selection)
        );
      },
    });
  }
}

class BestScore extends PixelTypography {
  constructor(scene: CharactersScene, point: Point) {
    super(scene, {
      ...point,
      text: 'BEST: 00.00',
      color: 'sky-blue',
    });

    const best = scene.server.storage.get(STORAGE_KEY.HIGH_SCORE, 99990);
    this.setText(`BEST: ${padScore(best)}`);
  }
}
