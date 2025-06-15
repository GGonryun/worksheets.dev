import { Point } from '@worksheets/phaser/types';

import {
  COLORS_HEX,
  ICON_SIZE,
  RELIC_ICON_BORDER_SIZE,
} from '../combat/constants';
import { Color } from '../combat/types';
import { RELIC_EFFECTS, RELICS } from '../relics/data';
import { DESCRIBE_RELIC_EFFECT } from '../relics/describe';
import { relicColorFill } from '../relics/relic';
import { RelicEffect, RelicInformation, RelicKey } from '../relics/types';

type RelicCardOptions = {
  key: RelicKey;
  level: number;
  showUpgradeIcon: boolean;
};

export const RELIC_CARD_SPRITE_SCALE = 0.6;

export class RelicCard extends Phaser.GameObjects.Container {
  options: RelicCardOptions;
  info: RelicInformation;
  effect: RelicEffect;
  background: Phaser.GameObjects.Sprite;
  title: Phaser.GameObjects.Text;
  description: Phaser.GameObjects.Text;
  sprite: RelicCardSprite;
  constructor(scene: Phaser.Scene, options: RelicCardOptions) {
    super(scene);
    this.options = options;
    this.info = RELICS[options.key];
    this.effect = RELIC_EFFECTS[options.key][options.level];

    this.sprite = new RelicCardSprite(scene, {
      x: 0,
      y: 72,
      sprite: this.info.sprite,
      color: this.info.color,
    }).setScale(RELIC_CARD_SPRITE_SCALE);
    this.add(this.sprite);

    const background = new Phaser.GameObjects.Sprite(
      scene,
      0,
      0,
      'game-relic-card-background'
    ).setOrigin(0.5, 0);
    this.add(background);
    this.background = background;

    const name = new Phaser.GameObjects.Text(scene, 0, 140, this.info.name, {
      fontSize: this.info.name.length > 14 ? '13px' : '14px',
      color: '#fff',
      align: 'center',
    })
      .setResolution(2)
      .setOrigin(0.5, 0);
    this.add(name);

    const descriptionText = DESCRIBE_RELIC_EFFECT(this.effect);
    const description = new Phaser.GameObjects.Text(
      scene,
      -64,
      170,
      descriptionText,
      {
        fontSize: descriptionText.length > 60 ? '12px' : '13px',
        color: '#fff',
        align: 'left',
        wordWrap: { width: 136 },
      }
    )
      .setResolution(2)
      .setOrigin(0, 0);
    this.add(description);

    const bounds = this.getBounds();
    this.setInteractive(
      new Phaser.Geom.Rectangle(
        -bounds.width / 2,
        0,
        bounds.width,
        bounds.height
      ),
      Phaser.Geom.Rectangle.Contains
    );

    this.options.showUpgradeIcon && this.addUpgradeIcon();
  }

  addUpgradeIcon() {
    const level = new Phaser.GameObjects.Sprite(
      this.scene,
      48,
      118,
      this.options.level < 1 ? 'icons-new' : 'icons-advantage'
    ).setScale(0.4);
    this.add(level);
  }

  animateIn({ from, to }: { from: Point; to: Point }) {
    return new Promise((resolve) =>
      this.scene.tweens.add({
        targets: this,
        x: { from: from.x, to: to.x },
        y: { from: from.y, to: to.y },
        delay: 100,
        duration: 500,
        ease: Phaser.Math.Easing.Back.Out,
        onComplete: resolve,
      })
    );
  }

  animateShrink() {
    return new Promise((resolve) =>
      this.scene.tweens.add({
        targets: this,
        scale: 0,
        y: this.y + 128,
        duration: 300,
        ease: Phaser.Math.Easing.Cubic.In,
        onComplete: resolve,
      })
    );
  }

  animateSlice() {
    // create two backgrounds and put a mask on each of them for the top and bottom sliced half.
    // then split them apart revealing only the picture in the background.
  }
}

export type RelicCardSpriteOptions = {
  x: number;
  y: number;
  sprite: string;
  color: Color;
};

export class RelicCardSprite extends Phaser.GameObjects.Container {
  private rectangle: Phaser.GameObjects.Rectangle;
  private sprite: Phaser.GameObjects.Sprite;
  color: Color;
  constructor(
    scene: Phaser.Scene,
    { x, y, sprite, color }: RelicCardSpriteOptions
  ) {
    super(scene, x, y);
    this.color = color;
    this.rectangle = new Phaser.GameObjects.Rectangle(
      scene,
      0,
      0,
      ICON_SIZE + 32,
      ICON_SIZE + 32,
      relicColorFill(color).color,
      1
    ).setStrokeStyle(RELIC_ICON_BORDER_SIZE, 0x000000);

    this.add(this.rectangle);

    this.sprite = new Phaser.GameObjects.Sprite(scene, 0, 0, sprite);
    this.add(this.sprite);
  }

  setTintFill(color: number) {
    this.rectangle.setFillStyle(color);
    this.sprite.setTintFill(color);
  }

  clearTintFill() {
    this.rectangle.setFillStyle(COLORS_HEX[this.color]);
    this.sprite.clearTint();
  }
}
