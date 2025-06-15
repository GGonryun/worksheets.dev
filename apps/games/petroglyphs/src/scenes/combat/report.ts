import { assertNever } from '@worksheets/util/errors';
import { keysOf } from '@worksheets/util/objects';

import { OrbType } from '../orbs/data';
import { RelicKey } from '../relics/types';
import { TileMatch, TileMatchType, TileType } from './types';

export type ReportProgress =
  | {
      type: 'tile-match';
      match: Omit<TileMatch, 'tileType'>;
    }
  | {
      type: 'tile-spent';
      tile: TileType;
    }
  | {
      type: 'orbs-collected';
      orbs: Record<OrbType, number>;
    }
  | {
      type: 'relic-activation';
      relic: RelicKey;
    }
  | {
      type: 'spell-cast';
      relic: RelicKey;
    }
  | {
      type: 'combo';
      length: number;
    }
  | {
      type: 'cascade';
      length: number;
    };

export class CombatReport {
  tileMatchTypes: Record<TileMatchType, number>;
  tileMatchLengths: Record<number, number>;
  comboLengths: Record<number, number>;
  cascadeLengths: Record<number, number>;
  tilesSpent: Record<TileType, number>;
  orbsCollected: Record<OrbType, number>;
  relicActivations: Record<RelicKey, number>;
  spellCasts: Record<RelicKey, number>;

  constructor() {
    // it's easier to lazily add properties here than to add them to the class now.
    this.tileMatchTypes = {} as Record<TileMatchType, number>;
    this.tileMatchLengths = {} as Record<number, number>;
    this.comboLengths = {} as Record<number, number>;
    this.cascadeLengths = {} as Record<number, number>;
    this.tilesSpent = {} as Record<TileType, number>;
    this.orbsCollected = {} as Record<OrbType, number>;
    this.relicActivations = {} as Record<RelicKey, number>;
    this.spellCasts = {} as Record<RelicKey, number>;
  }

  track(progress: ReportProgress) {
    switch (progress.type) {
      case 'tile-match':
        return this.trackTileMatch(progress.match);
      case 'tile-spent':
        return this.trackTileSpent(progress.tile);
      case 'orbs-collected':
        return this.trackOrbsCollected(progress.orbs);
      case 'relic-activation':
        return this.trackRelicActivation(progress.relic);
      case 'spell-cast':
        return this.trackSpellCast(progress.relic);
      case 'cascade':
        return this.trackCascade(progress.length);
      case 'combo':
        return this.trackCombo(progress.length);
      default:
        throw assertNever(progress);
    }
  }

  get largestCombo() {
    return Math.max(0, ...Object.keys(this.comboLengths).map(Number));
  }

  get largestCascade() {
    return Math.max(0, ...Object.keys(this.cascadeLengths).map(Number));
  }

  get totalOrbs() {
    return Object.values(this.orbsCollected).reduce(
      (sum, count) => sum + (count ?? 0),
      0
    );
  }

  get totalSpellCasts() {
    return Object.values(this.spellCasts).reduce(
      (sum, count) => sum + (count ?? 0),
      0
    );
  }

  get totalTiles() {
    return Object.values(this.tilesSpent).reduce(
      (sum, count) => sum + (count ?? 0),
      0
    );
  }

  get totalMatches() {
    return Object.values(this.tileMatchTypes).reduce(
      (sum, count) => sum + (count ?? 0),
      0
    );
  }

  get totalRelicActivation() {
    if (Object.keys(this.relicActivations).length === 0) return 0;

    return Object.values(this.relicActivations).reduce(
      (sum, count) => sum + count,
      0
    );
  }

  get largestMatch() {
    const keys = Object.keys(this.tileMatchLengths);
    if (keys.length === 0) return 0;
    return Math.max(...keys.map(Number));
  }

  get score() {
    return (
      this.totalOrbs +
      this.totalTiles +
      this.totalRelicActivation * 3 +
      this.largestMatch * 100 +
      this.largestCombo * 200 +
      this.largestCascade * 50
    );
  }

  private trackTileMatch(match: Omit<TileMatch, 'tileType'>) {
    const matchType = match.matchType;
    const matchLength = match.coordinates.length;
    this.tileMatchTypes[matchType] = (this.tileMatchTypes[matchType] || 0) + 1;
    this.tileMatchLengths[matchLength] =
      (this.tileMatchLengths[matchLength] || 0) + 1;
  }

  private trackTileSpent(tile: TileType) {
    this.tilesSpent[tile] = (this.tilesSpent[tile] || 0) + 1;
  }

  private trackOrbsCollected(orbs: Record<OrbType, number>) {
    for (const orb of keysOf(orbs)) {
      this.orbsCollected[orb] = (this.orbsCollected[orb] || 0) + orbs[orb];
    }
  }

  private trackRelicActivation(relic: RelicKey) {
    this.relicActivations[relic] = (this.relicActivations[relic] || 0) + 1;
  }

  private trackSpellCast(relic: RelicKey) {
    this.spellCasts[relic] = (this.spellCasts[relic] || 0) + 1;
  }

  private trackCascade(length: number) {
    this.cascadeLengths[length] = (this.cascadeLengths[length] || 0) + 1;
  }

  private trackCombo(length: number) {
    this.comboLengths[length] = (this.comboLengths[length] || 0) + 1;
  }

  print() {
    console.info('Tile Match Types:', this.tileMatchTypes);
    console.info('Tile Match Lengths:', this.tileMatchLengths);
    console.info('Tiles Spent:', this.tilesSpent);
    console.info('Orbs Collected:', this.orbsCollected);
    console.info('Relic Activations:', this.relicActivations);
    console.info('Spell Casts:', this.spellCasts);
    console.info('Combo Lengths:', this.comboLengths);
    console.info('Cascade Lengths:', this.cascadeLengths);
  }
}
