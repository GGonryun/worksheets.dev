import { Point } from '@worksheets/phaser/types';
import { identity } from 'lodash';

import { GAME_HEIGHT, GAME_WIDTH } from '../../settings';
import { ElementDepths } from '../combat/constants';
import { randomizeHalfPoint } from '../combat/particles';
import { PortalShaderPipeline } from '../shaders/portal';
import { subtractPoints } from '../util/_unsorted';

export class PortalController extends Phaser.GameObjects.Container {
  static PortalSize = 740;
  static PortalPoint = {
    x: GAME_WIDTH / 2,
    y: 190,
  };

  point: Point;
  portalScale = 2.5;
  portal: PortalShaderPipeline;
  sprite: Phaser.GameObjects.Sprite;
  block: Phaser.GameObjects.Rectangle;
  door: Phaser.GameObjects.Sprite;
  gate: Phaser.GameObjects.Sprite;

  constructor(
    scene: Phaser.Scene,
    point = PortalController.PortalPoint,
    scale = 2.5
  ) {
    super(scene);
    this.setDepth(ElementDepths.BACKGROUND);
    this.point = point;
    this.portalScale = scale;
    this.portal = PortalShaderPipeline.get(this.scene);

    this.sprite = new Phaser.GameObjects.Sprite(
      scene,
      point.x,
      point.y,
      'icons-transparent'
    )
      .setDepth(ElementDepths.CARD)
      .setOrigin(0.5, 0.5)
      .setScale(scale)
      .setPipeline(PortalShaderPipeline.Key);

    this.door = new Phaser.GameObjects.Sprite(
      scene,
      point.x,
      point.y - 8,
      'icons-door'
    )
      .setOrigin(0.5, 0.5)
      .setScale(scale * 0.9);
    this.add(this.door);
    this.add(this.sprite);

    const mask = new Phaser.Display.Masks.BitmapMask(scene, this.door);
    this.sprite.setMask(mask);

    this.gate = this.scene.add
      .sprite(point.x, point.y - 8, 'icons-gate')
      .setDepth(ElementDepths.PORTAL)
      .setScale(scale * 0.9);

    this.block = new Phaser.GameObjects.Rectangle(
      scene,
      0,
      0,
      GAME_WIDTH,
      GAME_HEIGHT,
      0x000000,
      1
    )
      .setOrigin(0, 0)
      .setDepth(ElementDepths.MAX)
      .setAlpha(0);
    this.add(this.block);

    this.portal.updatePosition(point.x, GAME_HEIGHT - point.y);
    this.portal.updateAlpha(1.0);
    this.portal.updateSize(
      PortalController.PortalSize,
      PortalController.PortalSize
    );
  }

  async consume() {
    return new Promise((resolve) => {
      const duration = 4000;
      this.scene.cameras.main.fadeOut(duration, 0, 0, 0);
      return this.scene.tweens.addCounter({
        from: 0,
        to: 1,
        duration: duration,
        ease: Phaser.Math.Easing.Sine.In,
        onStart: () => {
          this.portal.updateAlpha(1.0);
        },
        onUpdate: (tween) => {
          const value = tween.getValue();
          this.portal.updateSize(
            PortalController.PortalSize + value * 4000,
            PortalController.PortalSize + value * 4000
          );
          this.gate.setScale(this.portalScale * 0.9 + value * 15);
          this.door.setScale(this.portalScale * 0.9 + value * 15);
          this.sprite.setScale(this.portalScale + value * 14);
        },
        onComplete: resolve,
      });
    });
  }

  async close() {
    return new Promise((resolve) =>
      this.scene.tweens.addCounter({
        from: 1,
        to: 0,
        delay: 500,
        duration: 4250,
        ease: Phaser.Math.Easing.Quadratic.In,
        onUpdate: (tween) => {
          const value = tween.getValue();

          // if the portal size is 0 the sprite turns black.
          const size = Math.max(1, PortalController.PortalSize * value);
          this.portal.updateSize(size, size);
          this.gate.setScale(value * this.portalScale);
          this.door.setScale(value * this.portalScale);
        },
        onComplete: resolve,
      })
    );
  }

  onUpdate(time: number) {
    this.portal.onUpdate(time);
  }
}

export const absorbFunction = (
  scene: Phaser.Scene,
  {
    object,
    offset = { x: 0, y: 0 },
    delayModifier = 0,
    onComplete = identity,
    onStart = identity,
    point = PortalController.PortalPoint,
    durationOffset = 0,
    delayOffset = 0,
    reversed = false,
    objectScale = object.scale,
    randomizedXOffset = 10,
  }: {
    object:
      | Phaser.GameObjects.Sprite
      | Phaser.GameObjects.Container
      | Phaser.GameObjects.Text;
    offset?: Point;
    delayModifier?: number;
    point?: Point;
    onComplete?: () => void;
    onStart?: () => void;
    durationOffset?: number;
    delayOffset?: number;
    reversed?: boolean;
    objectScale?: number;
    randomizedXOffset?: number;
  }
) => {
  const portal = subtractPoints(point, offset);
  const half = randomizeHalfPoint(portal);
  const xVals = [
    object.x,
    half.x + Phaser.Math.RND.between(-randomizedXOffset, randomizedXOffset),
    portal.x + Phaser.Math.RND.between(-10, 10),
    portal.x,
  ];
  const yVals = [
    object.y,
    half.y,
    portal.y + Phaser.Math.RND.between(-10, 10),
    portal.y,
  ];

  if (reversed) {
    xVals.reverse();
    yVals.reverse();
  }

  const scale = reversed
    ? { from: 0, to: objectScale }
    : { from: objectScale, to: 0 };

  const delay = delayOffset + Phaser.Math.RND.between(0, 200 * delayModifier);
  const rotation = reversed
    ? { from: Phaser.Math.RND.rotation() * 2, to: object.rotation }
    : { from: object.rotation, to: Phaser.Math.RND.rotation() * 2 };

  const duration = durationOffset + Phaser.Math.RND.between(2000, 4000);
  scene.tweens.add({
    targets: object,
    delay,
    duration,
    rotation,
    alpha: 1,
    scale,
    ease: Phaser.Math.Easing.Sine.InOut,
  });
  scene.tweens.addCounter({
    from: 0,
    to: 1,
    delay,
    duration,
    onStart,
    onUpdate: (tween) => {
      const v = tween.getValue();
      const x = Phaser.Math.Interpolation.CatmullRom(xVals, v);
      const y = Phaser.Math.Interpolation.CatmullRom(yVals, v);
      object.setPosition(x, y);
    },
    onComplete,
  });
};
