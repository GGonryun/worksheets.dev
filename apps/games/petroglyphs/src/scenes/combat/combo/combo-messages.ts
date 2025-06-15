import { Point } from '@worksheets/phaser/types';
import { hasExactly } from '@worksheets/util/arrays';

import { addPoints } from '../../util/_unsorted';
import { COLORS_HEX, ElementDepths, TILE_TYPE_TO_COLOR } from '../constants';
import { TileType } from '../types';

export class ComboMessageSpawner extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene) {
    super(scene);
    this.scene = scene;

    this.setDepth(ElementDepths.MESSAGES);
  }

  spawn(
    point: Point,
    message: string,
    direction: 'left' | 'right',
    color: Phaser.Display.Color
  ) {
    const comboMessage = new ComboMessage(this.scene, message, color);
    const offset = direction === 'left' ? -50 : 50;

    comboMessage.setPosition(point.x - offset, point.y);
    comboMessage.setAlpha(0);

    this.add(comboMessage);
    this.scene.tweens.chain({
      targets: comboMessage,
      tweens: [
        {
          x: point.x,
          alpha: 1,
          duration: 500,
          ease: Phaser.Math.Easing.Quadratic.Out,
        },
        {
          scale: 1.25,
          duration: 250,
          ease: Phaser.Math.Easing.Bounce.InOut,
          yoyo: true,
          onUpdate: (tween) => {
            // tween to white and back.
            const progress = tween.progress;

            const c1 = Phaser.Display.Color.Interpolate.ColorWithColor(
              Phaser.Display.Color.ValueToColor('#ffffff'),
              color,
              1,
              progress
            );

            const c2 = Phaser.Display.Color.Interpolate.ColorWithColor(
              Phaser.Display.Color.ValueToColor('#ffffff'),
              Phaser.Display.Color.ValueToColor('#000000'),
              1,
              progress
            );

            comboMessage.setColor(
              Phaser.Display.Color.RGBToString(c1.r, c1.g, c1.b)
            );
            comboMessage.setStroke(
              Phaser.Display.Color.RGBToString(c2.r, c2.g, c2.b),
              6
            );
          },
        },
        {
          x: point.x + offset,
          alpha: 0,
          duration: 500,
          ease: Phaser.Math.Easing.Quadratic.In,
          onComplete: () => {
            comboMessage.destroy();
            this.remove(comboMessage);
          },
        },
      ],
    });
  }

  sweep(point: Point, messages: [string, string], tile: TileType) {
    if (!hasExactly(messages, 2)) throw new Error('Invalid number of messages');

    const [left, right] = messages;
    const color = COLORS_HEX[TILE_TYPE_TO_COLOR[tile]];

    const randomize = {
      x: Phaser.Math.Between(-16, 16),
      y: Phaser.Math.Between(-16, 16),
    };

    this.spawn(
      addPoints(randomize, { x: point.x, y: point.y }),
      left,
      'left',
      Phaser.Display.Color.ValueToColor(color).lighten(10)
    );
    this.spawn(
      addPoints(randomize, { x: point.x, y: point.y + 32 }),
      right,
      'right',
      Phaser.Display.Color.ValueToColor(color).lighten(10)
    );
  }
}

export class ComboMessage extends Phaser.GameObjects.Text {
  constructor(
    scene: Phaser.Scene,
    message: string,
    color: Phaser.Display.Color
  ) {
    super(scene, 0, 0, message, {
      fontFamily: 'Arial',
      fontSize: '24px',
      fontStyle: 'bold italic',
      color: color.rgba,
      stroke: '#000000',
      strokeThickness: 6,
    });
    this.scene = scene;
    this.setOrigin(0.5, 0.5);
  }
}
