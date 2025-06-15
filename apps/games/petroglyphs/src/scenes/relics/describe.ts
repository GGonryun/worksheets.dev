import { assertNever } from '@worksheets/util/errors';
import { capitalize, upperCase } from 'lodash';
import pluralize from 'pluralize';

import { ActionSkill } from '../combat/actions';
import { toTuple } from '../combat/combo/util';
import {
  MatchCondition,
  RelicCooldown,
  RelicEffect,
  RelicInstantTargeting,
  RelicPassiveAction,
  RelicSpellEffect,
  RelicSpellTargeting,
  RelicTrigger,
} from './types';

export const DESCRIBE_RELIC_EFFECT = (effect: RelicEffect): string => {
  switch (effect.type) {
    case 'triggered':
      return `${DESCRIBE_RELIC_TRIGGER(
        effect.trigger
      )}: ${ACTION_SKILL_DESCRIPTION(effect.action)}${DESCRIBE_RELIC_REPEAT(
        effect.trigger
      )}.`;
    case 'cooldown':
      return `Every ${DESCRIBE_COOLDOWN_TRIGGER(
        effect.when
      )}: ${ACTION_SKILL_DESCRIPTION(effect.action)}.`;
    case 'spell':
      return DESCRIBE_RELIC_SPELL(effect);

    case 'passive':
      return `${DESCRIBE_PASSIVE_RELIC(effect.action)}.`;
    default:
      throw assertNever(effect);
  }
};

export const DESCRIBE_RELIC_TRIGGER = (trigger: RelicTrigger): string => {
  switch (trigger.type) {
    case 'match':
      return `${trigger.when
        .map((c) => DESCRIBE_MATCH_CONDITION(c))
        .join(', or ')}`;
    case 'combo':
      return `${capitalize(toTuple(trigger.when.min))} match`;
    case 'cascade':
      return `Cascade ${trigger.when.min}`;

    default:
      throw assertNever(trigger);
  }
};

export const ACTION_SKILL_DESCRIPTION: (skill: ActionSkill) => string = (
  skill
) => {
  switch (skill.type) {
    case 'attack':
      return `Immediately earn ${skill.amount} ${pluralize(
        'point',
        skill.amount
      )}`;
    case 'heal':
      return `Gain ${skill.amount} extra ${pluralize('turn', skill.amount)}`;
    case 'destroy-tiles':
      return `Destroy ${skill.amount} ${
        skill.tiles ? skill.tiles.join(' or ') : 'RANDOM'
      } ${pluralize('tile', skill.amount)}`;
    case 'destroy-column':
      return `Destroy a random column of tiles`;
    case 'destroy-row':
      return `Destroy a random row of tiles`;
    case 'generate-orb':
      return `Generate ${skill.amount} ${
        skill.key ? `${skill.key}` : 'RANDOM'
      } ${pluralize('orb', skill.amount)}`;
    case 'replace-tiles':
      return `Convert ${skill.amount} ${
        skill.from ? `${skill.from} ` : ''
      }${pluralize('tile', skill.amount)} to ${skill.to} ${pluralize(
        'tile',
        skill.amount
      )}`;
    case 'shuffle':
      return `Shuffle the board`;
    default:
      throw assertNever(skill);
  }
};

export const DESCRIBE_MATCH_CONDITION = (condition: MatchCondition): string => {
  const { tile, length } = condition;

  // Tile description
  const tileDescription = tile ? `${tile} tiles` : 'tiles';

  // Length description
  const lengthDescription = length ? `${length}` : '';

  // Combine descriptions into a complete sentence
  return `Match ${lengthDescription} ${tileDescription}`;
};

export const DESCRIBE_COOLDOWN_TRIGGER = (when: RelicCooldown): string => {
  switch (when.type) {
    case 'turns':
      return `${when.amount} ${pluralize('turn', when.amount)}`;
    case 'matches':
      return `${when.amount} ${when.tile ? `${when.tile} ` : ''}${pluralize(
        'match',
        when.amount
      )}`;
    case 'tiles':
      return `${when.amount} ${when.tile ? `${when.tile} ` : ''}${pluralize(
        'tile',
        when.amount
      )}`;
    default:
      throw assertNever(when);
  }
};

export const DESCRIBE_RELIC_REPEAT = (trigger: RelicTrigger): string => {
  if ('repeat' in trigger && trigger.repeat) {
    switch (trigger.repeat.type) {
      case 'per-match':
        return ` per match`;
      default:
        throw assertNever(trigger.repeat.type);
    }
  }
  return '';
};

export const DESCRIBE_RELIC_SPELL = (effect: RelicSpellEffect) => {
  return `Activate after ${DESCRIBE_COOLDOWN_TRIGGER(
    effect.when
  )}: ${DESCRIBE_RELIC_SPELL_ACTION(effect.targeting)}.`;
};

export const DESCRIBE_RELIC_SPELL_ACTION = (action: RelicSpellTargeting) => {
  switch (action.type) {
    case 'single-target':
      return `Remove ${action.numTargets} ${pluralize(
        'tile',
        action.numTargets
      )}`;
    case 'circular':
      return `Destroy all tiles in a ${upperCase(action.radius)} circle`;
    case 'diagonal':
      return `Destroy all tiles in a diagonal line`;
    case 'tile-type':
      return `Destroy all tiles of the same type`;
    case 'instant':
      return DESCRIBE_RELIC_INSTANT_SPELL_ACTION(action);
    case 'line':
      return `Destroy all tiles in a line`;
    default:
      throw assertNever(action);
  }
};

export const DESCRIBE_RELIC_INSTANT_SPELL_ACTION = (
  action: RelicInstantTargeting
) => {
  switch (action.execute) {
    case 'shuffle':
      return `shuffle the board`;
    default:
      throw assertNever(action.execute);
  }
};

export const DESCRIBE_RELIC_EFFECT_CATEGORY = (effect: RelicEffect) => {
  switch (effect.type) {
    case 'cooldown':
      return 'Cooldown';
    case 'triggered':
      return 'Triggered';
    case 'passive':
      return 'Passive';
    case 'spell':
      return 'Spell';
    default:
      throw assertNever(effect);
  }
};

export const DESCRIBE_PASSIVE_RELIC = (action: RelicPassiveAction) => {
  switch (action.type) {
    case 'score':
      return `Increase the score of ${action.orb} orbs by ${action.amount}`;
    case 'experience':
      return `Increase the experience of ${action.tile} tiles by ${action.amount}`;
    default:
      throw assertNever(action);
  }
};
