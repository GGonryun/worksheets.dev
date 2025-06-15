import { assertNever } from '@worksheets/util/errors';

import { OrbType } from '../orbs/data';
import { RelicKey, RelicPassiveEffect } from '../relics/types';
import { TileType } from './types';

export class PlayerStats {
  orbScores: Record<OrbType, number>;
  tileExperience: Record<TileType, number>;
  influences: { key: RelicKey; effect: RelicPassiveEffect }[];
  constructor() {
    this.influences = [];
    this.orbScores = {
      BLUE: 1,
      GREEN: 1,
      PURPLE: 1,
      RED: 1,
      YELLOW: 1,
      GREY: 1,
    };

    this.tileExperience = {
      BLUE: 1,
      GREEN: 1,
      PURPLE: 1,
      RED: 1,
      YELLOW: 1,
      CRATE: 0,
      RAINBOW: 3,
      BOMB: 1,
      BOULDER: 1,
    };
  }

  computeScore(tile: OrbType) {
    return this.orbScores[tile];
  }

  computeExperience(tile: TileType) {
    return this.tileExperience[tile];
  }

  // passive effects don't use deltas, they just give us the new value.
  // so we must keep track of old values to remove the old effect, before
  // adding the new one.
  upsertEffect(key: RelicKey, effect: RelicPassiveEffect) {
    this.removeEffect(key);
    this.addEffect(key, effect);
  }

  removeEffect(key: RelicKey) {
    const existing = this.influences.find((i) => i.key === key);
    if (!existing) return;
    const { action } = existing.effect;
    switch (action.type) {
      case 'score': {
        this.orbScores[action.orb] -= action.amount;
        break;
      }
      case 'experience': {
        this.tileExperience[action.tile] -= action.amount;
        break;
      }
      default:
        throw assertNever(action);
    }
    this.influences = this.influences.filter((i) => i.key !== key);
  }

  addEffect(key: RelicKey, effect: RelicPassiveEffect) {
    const { action } = effect;
    switch (action.type) {
      case 'score':
        this.orbScores[action.orb] += action.amount;
        break;
      case 'experience':
        this.tileExperience[action.tile] += action.amount;
        break;
      default:
        throw assertNever(action);
    }

    this.influences.push({ key, effect });
  }
}
