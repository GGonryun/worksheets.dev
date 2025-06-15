import { Coordinate, Point } from '@worksheets/phaser/types';

import {
  CELL_SETTINGS,
  GRID_SETTINGS,
  TILE_CONSUMPTION_SPEED,
} from '../constants';
import { Cell } from './cell';

export const equalCoordinate = (left: Coordinate, right: Coordinate) =>
  left.row === right.row && left.col === right.col;

export type CellPacket = {
  coordinates: Coordinate;
  cell: Cell;
};

export const isOutOfBounds = (point: Point | Coordinate) => {
  if ('x' in point) {
    return (
      point.x < GRID_SETTINGS.x ||
      point.x > GRID_SETTINGS.x + GRID_SETTINGS.width ||
      point.y < GRID_SETTINGS.y ||
      point.y > GRID_SETTINGS.y + GRID_SETTINGS.height
    );
  } else {
    return (
      point.row < 0 ||
      point.row >= GRID_SETTINGS.rows ||
      point.col < 0 ||
      point.col >= GRID_SETTINGS.columns
    );
  }
};

export const toCoordinate = (pointer: Point): Coordinate => {
  const { x, y } = pointer;

  const { gap } = GRID_SETTINGS;
  const { size } = CELL_SETTINGS;

  const row = Math.floor((y - GRID_SETTINGS.y) / (size + gap));
  const col = Math.floor((x - GRID_SETTINGS.x) / (size + gap));
  return { row, col };
};

export const toGridPosition = (coordinates: Coordinate): Point => {
  return {
    x:
      CELL_SETTINGS.size / 2 +
      GRID_SETTINGS.x +
      coordinates.col * (CELL_SETTINGS.size + GRID_SETTINGS.gap),
    y:
      CELL_SETTINGS.size / 2 +
      GRID_SETTINGS.y +
      coordinates.row * (CELL_SETTINGS.size + GRID_SETTINGS.gap),
  };
};

export const cellTermination = async <T extends Phaser.GameObjects.GameObject>(
  scene: Phaser.Scene,
  object: T,
  onStart: (object: T) => void,
  position?: Point,
  speed: number = TILE_CONSUMPTION_SPEED
) => {
  return await new Promise((resolve) => {
    scene.tweens.chain({
      targets: object,
      tweens: [
        {
          scale: 0, // Shrink it down to nothing
          alpha: 0, // Fade out as it shrinks
          ...position,
          duration: speed,
          ease: Phaser.Math.Easing.Cubic.In,
          onComplete: () => {
            resolve(true);
          },
          onStart: () => {
            // lets turn the cell white.
            onStart(object);
          },
        },
      ],
    });
  });
};
