import { MobElement, MobRace, MobSize } from '@worksheets/prisma';

export const MOBS = [
  {
    id: 100 as const,
    version: 1,
    name: 'Jeeble',
    description:
      'A gelatinous monster that is usually found in tall grass. It will attack anything that moves.',
    imageUrl: 'https://cdn.charity.games/_mobs/jeeble.png',
    maxHp: 500,
    level: 1,
    race: MobRace.FORMLESS,
    element: MobElement.WATER_1,
    size: MobSize.SMALL,
    attack: 10,
    defense: 0,
    baseExp: 100,
    mvpExp: 100,
    loot: [
      { itemId: '2', quantity: 1, chance: 1, mvp: false },
      { itemId: '3', quantity: 1, chance: 1, mvp: false },
      { itemId: '6', quantity: 1, chance: 1, mvp: false },
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
    maxHp: 600,
    level: 2,
    race: MobRace.INSECT,
    element: MobElement.EARTH_1,
    size: MobSize.SMALL,
    attack: 8,
    defense: 0,
    baseExp: 200,
    mvpExp: 200,
    loot: [
      { itemId: '2', quantity: 3, chance: 1, mvp: false },
      { itemId: '5', quantity: 1, chance: 1, mvp: true },
    ],
  },
  {
    id: 102 as const,
    version: 1,
    name: 'Small Wolf',
    imageUrl: 'https://cdn.charity.games/_mobs/102.png',
    description:
      "A small wolf; it's lost its way and is now attacking anything that moves.",
    maxHp: 700,
    level: 1,
    race: MobRace.BEAST,
    element: MobElement.FIRE_1,
    size: MobSize.SMALL,
    attack: 10,
    defense: 0,
    baseExp: 250,
    mvpExp: 250,
    loot: [
      { itemId: '1001', quantity: 1, chance: 1, mvp: false },
      { itemId: '1002', quantity: 1, chance: 1, mvp: false },
      { itemId: '1003', quantity: 1, chance: 1, mvp: false },
      { itemId: '1004', quantity: 1, chance: 1, mvp: false },
      { itemId: '1000', quantity: 1, chance: 1, mvp: true },
    ],
  },
  {
    id: 103 as const,
    version: 1,
    name: 'Earth Crystal',
    imageUrl: 'https://cdn.charity.games/_mobs/103.png',
    description:
      "A crystal that is usually found in caves. It has gained sentience. It doesn't seem to be hostile. It's just sitting there.",
    maxHp: 1000,
    level: 1,
    race: MobRace.FORMLESS,
    element: MobElement.EARTH_1,
    size: MobSize.SMALL,
    attack: 0,
    defense: 0,
    baseExp: 300,
    mvpExp: 300,
    loot: [
      { itemId: '2', quantity: 5, chance: 1, mvp: false },
      { itemId: '5', quantity: 1, chance: 1, mvp: true },
    ],
  },
];

export type Mob = (typeof MOBS)[number];

export type MobId = Mob['id'];
