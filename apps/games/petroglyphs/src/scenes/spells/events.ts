import { RelicSpell } from '../relics/types';

export type SpellEvents = {
  clicked: [RelicSpell];
  'spell-absorbed': [RelicSpell];
};
