import { Bounds, Point } from '@worksheets/phaser/types';

import { TileType } from './types';

export const getEvenPositions = (
  containerSize: number,
  itemCount: number
): number[] => {
  // If no items are specified or container is too small, return an empty array
  if (itemCount <= 0 || containerSize <= 0) return [];

  // Calculate the spacing between items
  const spacing = containerSize / (itemCount + 1);

  // Generate the positions
  const positions: number[] = [];
  for (let i = 1; i <= itemCount; i++) {
    positions.push(spacing * i);
  }

  return positions;
};

export const IS_BASIC_TILES: Record<TileType, boolean> = {
  RED: true,
  YELLOW: true,
  GREEN: true,
  BLUE: true,
  PURPLE: true,
  CRATE: false,
  RAINBOW: false,
  BOMB: false,
  BOULDER: false,
};

export const BASIC_TILES: TileType[] = Object.entries(IS_BASIC_TILES)
  .filter(([, isBasic]) => isBasic)
  .map(([color]) => color as TileType);

export const getWorldBounds = (
  obj: Phaser.GameObjects.Container | Phaser.GameObjects.Text
): Bounds => {
  const matrix = obj.getWorldTransformMatrix();
  const decomposed = matrix.decomposeMatrix();
  const bounds = obj.getBounds();
  return {
    x: decomposed.translateX,
    y: decomposed.translateY,
    height: bounds.height,
    width: bounds.width,
  };
};

export const centerY = (bounds: Bounds): Point => {
  return {
    x: bounds.x,
    y: bounds.y + bounds.height / 2,
  };
};
