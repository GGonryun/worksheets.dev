import { Point } from '@worksheets/phaser/types';

export const addPoints = (a: Point, b: Point): Point => ({
  x: a.x + b.x,
  y: a.y + b.y,
});

export const subtractPoints = (a: Point, b: Point): Point => ({
  x: a.x - b.x,
  y: a.y - b.y,
});

export enum RegistryKey {
  RELICS_SEEN = 'relics-seen',
  HIGH_SCORE = 'high-score',
  TOTAL_ORBS = 'total-orbs',
  TOTAL_TILES = 'total-tiles',
  TOTAL_MATCHES = 'total-matches',
}
