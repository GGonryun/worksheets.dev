import { Coordinate, Point } from '@worksheets/phaser/types';

import { ActionSkill } from '../combat/actions';
import { Color, TileMatch, TileType } from '../combat/types';
import { OrbType } from '../orbs/data';

export type RelicKey =
  // set 1
  | 'relic-bottle'
  | 'relic-extinguisher'
  | 'relic-flashlight'
  | 'relic-broken-wand'
  | 'relic-wand'
  | 'relic-kunai'
  | 'relic-stock-pot'
  | 'relic-cash-register'
  | 'relic-shuriken'
  // set 2
  | 'relic-blermy'
  | 'relic-milton'
  | 'relic-stepper'
  | 'relic-phool'
  | 'relic-quacksire'
  | 'relic-swords'
  | 'relic-matchbox'
  | 'relic-explosive-powder'
  | 'relic-chest'
  | 'relic-trowel'
  // set 3
  | 'relic-slime-engine'
  | 'relic-dynamite-stick'
  | 'relic-emerald-shard'
  | 'relic-eye'
  | 'relic-magic-missile'
  | 'relic-boulder-roll'
  | 'relic-whirlpool'
  | 'relic-star-fall'
  | 'relic-lightning-strike'
  | 'relic-fireball'
  // set 4
  | 'relic-pickaxe'
  | 'relic-banana'
  | 'relic-beetle'
  | 'relic-fireworks'
  | 'relic-book-of-fire'
  | 'relic-book-of-war'
  | 'relic-slime-doctor'
  | 'relic-catcher'
  | 'relic-tim'
  | 'relic-book-of-earth'
  // set 5
  | 'relic-slime-red'
  | 'relic-slime-green'
  | 'relic-slime-blue'
  | 'relic-slime-yellow'
  | 'relic-slime-purple'
  | 'relic-death-spore'
  | 'relic-magnifying-glass'
  | 'relic-telescope'
  | 'relic-moonflower'
  | 'relic-sunflower'
  // set 6
  | 'relic-book-of-water'
  | 'relic-book-of-light'
  | 'relic-book-of-darkness'
  | 'relic-cow'
  | 'relic-corn'
  | 'relic-battery'
  | 'relic-milk'
  | 'relic-strawberry'
  | 'relic-stony-light'
  | 'relic-stony-dark'
  // set 7
  | 'relic-pancho'
  | 'relic-slime-santa'
  | 'relic-slime-bunny'
  | 'relic-fly'
  | 'relic-embers'
  | 'relic-lunatic'
  | 'relic-antling'
  | 'relic-watering-pail';

type RelicMatchTrigger = {
  type: 'match';
  when: MatchCondition[];
};
type RelicComboTriggerRule = { when: ComboCondition; repeat?: RepeatCondition };

export type RelicComboTrigger = {
  type: 'combo';
} & RelicComboTriggerRule;

export type RelicCascadeTrigger = {
  type: 'cascade';
} & RelicComboTriggerRule;

export type RelicTrigger =
  | RelicMatchTrigger
  | RelicComboTrigger
  | RelicCascadeTrigger;

export type RelicPassiveAction =
  | {
      type: 'score';
      orb: OrbType;
      amount: number;
    }
  | {
      type: 'experience';
      tile: TileType;
      amount: number;
    };

export type RelicPassiveEffect = {
  type: 'passive';
  action: RelicPassiveAction;
};

export type RelicTriggeredEffect = {
  type: 'triggered';
  action: ActionSkill;
  trigger: RelicTrigger;
};

export type RelicCooldownEffect = {
  type: 'cooldown';
  action: ActionSkill;
  when: RelicCooldown;
};

export type RelicSingleTargetingAction =
  | {
      type: 'destroy-tiles';
    }
  | {
      type: 'replace-tiles';
      to: TileType;
    };

export type RelicSingleTargetingActionType = RelicSingleTargetingAction['type'];

export type RelicSingleTargeting = {
  type: 'single-target';
  numTargets: number;
  action: RelicSingleTargetingAction;
};

export type RelicTargetingSize = 'small' | 'medium' | 'large';

export type RelicCircleTargeting = {
  type: 'circular';
  radius: RelicTargetingSize;
};

export type RelicDiagonalTargeting = {
  type: 'diagonal';
};

export type RelicTileTypeTargeting = {
  type: 'tile-type';
};

export type RelicLineTargeting = {
  type: 'line';
};

export type RelicInstallSpellEffect = 'shuffle';

export type RelicInstantTargeting = {
  type: 'instant';
  execute: RelicInstallSpellEffect;
};

export type RelicSpellTargeting =
  | RelicSingleTargeting
  | RelicCircleTargeting
  | RelicDiagonalTargeting
  | RelicTileTypeTargeting
  | RelicLineTargeting
  | RelicInstantTargeting;

export type RelicSpellLineTargetingData =
  | {
      direction: 'row';
      row: number;
      placement: 'left' | 'right';
    }
  | {
      direction: 'column';
      col: number;
    };

export type RelicSpellTargetingData =
  | {
      type: 'single-target';
      origins: Coordinate[];
      action: RelicSingleTargetingAction;
    }
  | {
      type: 'circular';
      origin: Point;
      radius: number;
    }
  | {
      type: 'diagonal';
      origin: Coordinate;
    }
  | {
      type: 'tile-type';
      point: Point;
    }
  | { type: 'instant'; execute: RelicInstallSpellEffect }
  | ({ type: 'line' } & RelicSpellLineTargetingData);

export type RelicSpellEffect = {
  type: 'spell';
  targeting: RelicSpellTargeting;
  when: RelicCooldown;
};

export type RelicEffect =
  | RelicTriggeredEffect
  | RelicCooldownEffect
  | RelicSpellEffect
  | RelicPassiveEffect;

export type RelicSpell = {
  key: RelicKey;
  sprite: string;
  effect: RelicSpellEffect;
};

export type RelicInformation = {
  key: RelicKey;
  name: string;
  sprite: string;
  color: Color;
};

export type RelicEvolution = {
  color: Color;
  replaces: RelicKey;
  requirements: RelicOwnership[];
};

export type RelicEvolutionMap = {
  [key in RelicKey]?: RelicEvolution;
};

export type RelicCooldownType = RelicCooldown['type'];

export type RelicTileCooldown = {
  type: 'tiles';
  amount: number;
  tile?: TileType;
};
export type RelicMatchCooldown = {
  type: 'matches';
  amount: number;
  tile?: TileType;
};
export type RelicTurnCooldown = {
  type: 'turns';
  amount: number;
};
export type RelicCooldown =
  | RelicTurnCooldown
  | RelicMatchCooldown
  | RelicTileCooldown;

export type RepeatCondition = { type: 'per-match' };

export type ComboCondition = { min: number };

export type MatchCondition = {
  tile?: TileType;
  length?: number;
};

export type ActionExecution = {
  action: ActionSkill;
  from: Point;
  color: Color;
};

export type RelicEvents = {
  'execute-skill': [
    ActionExecution & {
      key: RelicKey;
    }
  ];
  'relic-absorbed': [RelicInformation];
};

export type RelicMatchActivation = { type: 'match'; match: TileMatch };
export type RelicComboActivation = { type: 'combo'; size: number };
export type RelicCascadeActivation = { type: 'cascade'; size: number };

export type RelicActivation =
  | RelicMatchActivation
  | RelicComboActivation
  | RelicCascadeActivation;

export type RelicOwnership = {
  level: number;
  key: RelicKey;
};

export const isTriggerType =
  <T extends RelicTrigger['type']>(...values: T[]) =>
  (input: RelicTrigger): input is Extract<RelicTrigger, { type: T }> =>
    values.includes(input.type as T);

export const isTriggeredEffect = (
  effect: RelicEffect
): effect is RelicTriggeredEffect => {
  return effect.type === 'triggered';
};

export const isCooldownEffect = (
  effect: RelicEffect
): effect is RelicCooldownEffect => {
  return effect.type === 'cooldown';
};

export const isSpellEffect = (
  effect: RelicEffect
): effect is RelicSpellEffect => {
  return effect.type === 'spell';
};

export const isPassiveEffect = (
  effect: RelicEffect
): effect is RelicPassiveEffect => {
  return effect.type === 'passive';
};
