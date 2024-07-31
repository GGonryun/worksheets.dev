export const DEBUGGING = false;
export const TILE_SIZE = 16;

export enum Depths {
  BACKGROUND = 0,
  INTERACTING = 1,
  FOREGROUND = 2,
  PLAYER = 3,
}

export enum MovementSpeed {
  WALKING = 'walking',
  CLIMBING = 'climbing',
}

export const CHARACTER_SPEEDS: Record<MovementSpeed, number> = {
  climbing: 0.02,
  walking: 0.04,
};
export const GAME_VERSION = 'v1.0.2';
