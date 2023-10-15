import { BonusPricing } from './types';

export const GAME_TITLE = 'Nonograms';
export const GAME_DESCRIPTION = 'Solve the puzzle to reveal the hidden image!';
export const APP_VERSION = 1;
export const BONUS_PRICING: Record<number, BonusPricing> = {
  8: {
    bucket: 100,
    crosshair: 100,
  },
  16: {
    bucket: 100,
    crosshair: 200,
  },
};
