import { CarType } from '../objects/car';
// this order comes from the ui-progress image.
export const CAR_SPRITES: CarType[] = [
  'yellow',
  'green',
  'blue',
  'red',
] as const;

export const PORTRAIT_KEY: Record<CarType, string> = {
  red: 'player-cherry',
  blue: 'player-slime',
  green: 'player-carrot',
  yellow: 'player-lemon',
  police: 'player-cop',
};

export const PORTRAIT_FRAMES: Record<CarType, number> = {
  red: 1,
  blue: 1,
  green: 1,
  yellow: 1,
  police: 2,
};

export const DEPTHS = {
  UI: 12,
  CAR: 11,
  FINISH: 10,
  ROAD: 8,
  DETAILS: 9,
};

export const MENU_ORIGIN = {
  x: 149,
  y: 84,
};

export const STORAGE_KEY = {
  MUTED: 'muted',
  HIGH_SCORE: 'high-score',
  TOTAL_CLICKS: 'total-clicks',
  TOTAL_RACES: 'total-races',
};
