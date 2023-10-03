import { PowerUpCode } from './types';

export const APP_VERSION = 1;
export const UPDATE_BONUS = 200;

export const PUZZLE_GAP = 0.33;
export const MAX_PUZZLE_HEIGHT = 10;
export const MAX_WORDS_IN_PUZZLE = 16;
export const MAX_BONUSES_IN_PUZZLE = 30;

export const STARTING_PLAYER_POINTS = 50;
export const BONUS_WATER_MODIFIER = 2;
export const BASIC_WATER_MODIFIER = 1;
export const BONUS_POINTS_MODIFIER = 1.5;

export const POWER_UP_COSTS: Record<PowerUpCode, number> = {
  'unlock-1-letter': 15,
  'unlock-3-letters': 40,
  'unlock-5-letters': 60,
  'unlock-1-word': 50,
  'unlock-3-words': 120,
  'finish-puzzle': 700,
};

export const POWER_UP_LABELS: Record<PowerUpCode, string> = {
  'unlock-1-letter': 'Unlock 1 Letter',
  'unlock-3-letters': 'Unlock 3 Letters',
  'unlock-5-letters': 'Unlock 5 Letters',
  'unlock-1-word': 'Unlock 1 Random Word',
  'unlock-3-words': 'Unlock 3 Random Words',
  'finish-puzzle': 'Finish Puzzle',
};
