import { Direction } from '@worksheets/phaser/types';

import { GAME_HEIGHT, GAME_WIDTH } from '../main';
import { ElementDepth } from '../util/depth';
import { FireEvent } from './bow';
import { ARROW_OBJECT_TYPE } from './types';

export const newArrowFactory = (arrows: Phaser.Physics.Arcade.Group) => {
  const boundOffset = 24;
  const extendedWorldBounds = new Phaser.Geom.Rectangle(
    -boundOffset,
    -boundOffset,
    GAME_WIDTH + boundOffset * 2,
    GAME_HEIGHT + boundOffset * 2
  );

  return {
    create: ({ direction, position, angle }: FireEvent) => {
      const arrow = arrows.create();
      arrow.setDepth(ElementDepth.Arrow);
      arrow.setScale(1);
      arrow.type = ARROW_OBJECT_TYPE;

      const sizes: Record<Direction, [number, number]> = {
        up: [4, 16],
        down: [4, 16],
        left: [16, 4],
        right: [16, 4],
      };
      const [sx, sy] = sizes[direction];
      arrow.setSize(sx, sy);

      const force = 128;
      const velocities: Record<Direction, [number, number]> = {
        right: [-force, 0],
        down: [0, force],
        left: [force, 0],
        up: [0, -force],
      };
      const [vx, vy] = velocities[direction];

      const [px, py] = position;
      arrow.setPosition(px, py);
      arrow.setVelocity(vx, vy);
      arrow.setAngle(angle);

      // if arrow goes out of bounds, destroy it
      arrow.body.onWorldBounds = true;
      arrow.body.customBoundsRectangle = extendedWorldBounds;
    },
  };
};
