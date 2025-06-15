import { Point } from '@worksheets/phaser/types';

import { STORE_FONT } from '../../util/fonts';
import {
  CELL_SETTINGS,
  ElementDepths,
  ICON_SIZE,
  LAYER_CONSUMPTION_SPEED,
  TILE_CONSUMPTION_SPEED,
  TILE_SPRITES,
} from '../constants';
import { TileType } from '../types';

export type CellOptions = {
  type: TileType;
  layer?: 'slime';
};

export class Cell extends Phaser.GameObjects.Container {
  options: CellOptions;
  tile: Phaser.GameObjects.Sprite;
  layer: Phaser.GameObjects.Sprite | undefined;
  hp: number;
  text: Phaser.GameObjects.Text;
  cover: Phaser.GameObjects.Rectangle;
  wiggle?: Phaser.Tweens.Tween;
  constructor(scene: Phaser.Scene, opts: CellOptions) {
    super(scene, 0, 0);

    this.options = opts;
    this.hp = 1;
    this.setScale(CELL_SETTINGS.scale);
    this.setDepth(ElementDepths.BACKGROUND);

    this.create();
  }

  private create() {
    this.createTile();
    this.createText();
    if (this.options.layer === 'slime') {
      this.addSlime();
    }
  }

  createText() {
    this.text = new Phaser.GameObjects.Text(
      this.scene,
      0,
      0,
      this.hp.toString(),
      {
        ...STORE_FONT,
      }
    );
    this.text.setOrigin(0.5, 0.5);
    this.text.setPosition(ICON_SIZE / 2, ICON_SIZE / 2);
    this.text.setVisible(false);
    this.add(this.text);
  }

  createTile() {
    this.tile = new Phaser.GameObjects.Sprite(
      this.scene,
      0,
      0,
      TILE_SPRITES[this.options.type]
    );
    this.tile.setOrigin(0, 0);
    this.add(this.tile);

    this.cover = new Phaser.GameObjects.Rectangle(
      this.scene,
      0,
      0,
      ICON_SIZE,
      ICON_SIZE,
      0x000000
    )
      .setAlpha(0)
      .setOrigin(0, 0);
    this.add(this.cover);
  }

  updateTile(type: TileType) {
    this.options.type = type;
    this.tile.setTexture(TILE_SPRITES[type]);
  }

  setCellPosition({ x, y }: Point) {
    this.x = x;
    this.y = y;
  }

  async addSlime() {
    if (this.layer) return;

    this.layer = new Phaser.GameObjects.Sprite(this.scene, 0, 0, 'icons-slime');
    this.layer.setScale(CELL_SETTINGS.scale);
    this.layer.setPosition(0, 4);
    this.layer.setOrigin(0, 0);
    this.layer.setAlpha(0);
    this.add(this.layer);
    this.options.layer = 'slime';

    await new Promise((resolve) =>
      this.scene.tweens.add({
        targets: this.layer,
        alpha: 0.75,
        duration: TILE_CONSUMPTION_SPEED,
        onComplete: resolve,
      })
    );
  }

  async removeLayer() {
    if (!this.layer) return;

    this.options.layer = undefined;

    const layer = this.layer;

    return new Promise((resolve) =>
      this.scene.tweens.add({
        targets: this.layer,
        alpha: 0,
        duration: LAYER_CONSUMPTION_SPEED,
        onComplete: () => {
          this.remove(layer);
          layer.destroy();
          resolve(true);
        },
      })
    );
  }

  clone() {
    const clone = new Cell(this.scene, this.options);
    clone.setPosition(this.x, this.y);
    return clone;
  }

  highlight(color = 0xff0000) {
    this.cover.setFillStyle(color);
    this.cover.setAlpha(0.5);

    if (!this.wiggle) {
      const pick = () => Phaser.Math.FloatBetween(-3, 3);
      let valueX = pick();
      let valueY = pick();
      this.wiggle = this.scene.tweens.addCounter({
        from: 0,
        to: 1,
        duration: 50,
        ease: Phaser.Math.Easing.Sine.InOut,
        yoyo: true,
        repeat: -1,
        onUpdate: (tween) => {
          const v = tween.getValue();
          this.tile.x = valueX * v;
          this.tile.y = valueY * v;
        },
        onRepeat: () => {
          valueX = pick();
          valueY = pick();
        },
      });
    }
  }

  unhighlight() {
    this.setScale(CELL_SETTINGS.scale);

    this.cover.setAlpha(0);

    if (this.wiggle) {
      this.wiggle.stop();
      this.wiggle.destroy();
      this.wiggle = undefined;
      this.tile.x = 0;
      this.tile.y = 0;
    }
  }
}
