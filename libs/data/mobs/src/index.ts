import { MobElement, MobRace, MobSize } from '@worksheets/prisma';

export const MOBS = [
  {
    id: 100 as const,
    version: 1,
    name: 'Jeeble',
    description:
      'A gelatinous monster that is usually found in tall grass. It will attack anything that moves.',
    imageUrl: 'https://cdn.charity.games/_mobs/jeeble.png',
    maxHp: 1000,
    level: 1,
    race: MobRace.FORMLESS,
    element: MobElement.WATER_1,
    size: MobSize.SMALL,
    attack: 10,
    defense: 0,
    baseExp: 100,
    mvpExp: 100,
    loot: [
      { itemId: '2', quantity: 5, chance: 1, mvp: false },
      { itemId: '5', quantity: 1, chance: 1, mvp: true },
    ],
  },
  {
    id: 101 as const,
    version: 1,
    name: 'Dab',
    imageUrl: 'https://cdn.charity.games/_mobs/dab.png',
    description:
      'A small larva monster that is usually found in dark places. It is very sensitive to light and heat.',
    maxHp: 1000,
    level: 2,
    race: MobRace.INSECT,
    element: MobElement.EARTH_1,
    size: MobSize.SMALL,
    attack: 8,
    defense: 0,
    baseExp: 200,
    mvpExp: 200,
    loot: [
      { itemId: '2', quantity: 5, chance: 1, mvp: false },
      { itemId: '5', quantity: 1, chance: 1, mvp: true },
    ],
  },
];

export type Mob = (typeof MOBS)[number];

export type MobId = Mob['id'];
