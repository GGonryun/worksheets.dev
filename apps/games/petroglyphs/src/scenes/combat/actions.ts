import { OrbType } from '../orbs/data';
import { TileColor, TileType } from './types';

export type ActionSkill =
  | {
      type: 'attack';
      amount: number;
      color: TileColor;
    }
  | {
      type: 'shuffle';
    }
  | {
      type: 'heal';
      amount: number;
    }
  | {
      type: 'destroy-tiles';
      amount: number;
      tiles?: TileType[];
    }
  | {
      type: 'destroy-column';
    }
  | {
      type: 'destroy-row';
    }
  | {
      type: 'generate-orb';
      amount: number;
      key?: OrbType;
    }
  | {
      type: 'replace-tiles';
      amount: number;
      // if omitted, defaults to 'random'
      from?: TileType;
      to: TileType;
    };

export type ActionSkillKey = ActionSkill['type'];

export const ACTION_SKILL_NAME: Record<ActionSkillKey, string> = {
  attack: 'Attack',
  heal: 'Heal',
  'destroy-tiles': 'Destroy Tiles',
  'destroy-column': 'Destroy Column',
  'destroy-row': 'Destroy Row',
  'generate-orb': 'Generate Orb',
  'replace-tiles': 'Replace Tiles',
  shuffle: 'Shuffle',
};
