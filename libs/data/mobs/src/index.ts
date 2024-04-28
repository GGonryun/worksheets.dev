import { MobElement, MobRace, MobSize } from '@worksheets/prisma';
import { z } from 'zod';

export const MOBS = [
  {
    id: 100 as const,
    version: 1,
    name: 'Jeeble',
    description:
      'A gelatinous monster that is usually found in tall grass. It will attack anything that moves.',
    imageUrl: 'https://cdn.charity.games/_mobs/100.png',
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
      { itemId: '10001', quantity: 5, chance: 0.1, mvp: false },
      { itemId: '10002', quantity: 5, chance: 0.15, mvp: false },
      { itemId: '10003', quantity: 5, chance: 0.2, mvp: false },
      { itemId: '10004', quantity: 5, chance: 0.25, mvp: false },
      { itemId: '2', quantity: 2, chance: 0.1, mvp: false },
      { itemId: '5', quantity: 1, chance: 1, mvp: true },
    ],
  },
  {
    id: 101 as const,
    version: 1,
    name: 'Dab',
    imageUrl: 'https://cdn.charity.games/_mobs/101.png',
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
      { itemId: '1005', quantity: 3, chance: 0.1, mvp: false },
      { itemId: '10005', quantity: 1, chance: 0.02, mvp: false },
      { itemId: '10006', quantity: 4, chance: 0.05, mvp: false },
      { itemId: '10007', quantity: 3, chance: 0.15, mvp: false },
      { itemId: '10008', quantity: 6, chance: 0.2, mvp: false },
      { itemId: '10009', quantity: 2, chance: 0.05, mvp: false },
      { itemId: '2', quantity: 1, chance: 0.1, mvp: false },
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
      { itemId: '1001', quantity: 3, chance: 0.25, mvp: false },
      { itemId: '10010', quantity: 3, chance: 0.2, mvp: false },
      { itemId: '10011', quantity: 1, chance: 1, mvp: false },
      { itemId: '10012', quantity: 5, chance: 0.5, mvp: false },
      { itemId: '10013', quantity: 2, chance: 0.05, mvp: true },
      { itemId: '10014', quantity: 1, chance: 0.4, mvp: true },
      { itemId: '1000', quantity: 2, chance: 1, mvp: true },
    ],
  },
  {
    id: 103 as const,
    version: 2,
    name: 'Sentient Stone',
    imageUrl: 'https://cdn.charity.games/_mobs/103.png',
    description:
      "A stone that is usually found in caves. It has gained sentience. It doesn't seem to be hostile. It's just floating there.",
    maxHp: 1000,
    level: 3,
    race: MobRace.FORMLESS,
    element: MobElement.EARTH_1,
    size: MobSize.MEDIUM,
    attack: 0,
    defense: 10,
    baseExp: 300,
    mvpExp: 300,
    loot: [
      { itemId: '2', quantity: 1, chance: 0.01, mvp: false },
      { itemId: '10005', quantity: 1, chance: 0.01, mvp: false },
      { itemId: '10013', quantity: 1, chance: 0.01, mvp: false },
      { itemId: '10015', quantity: 1, chance: 0.01, mvp: false },
      { itemId: '10016', quantity: 1, chance: 0.01, mvp: false },
      { itemId: '10017', quantity: 1, chance: 0.01, mvp: false },
      { itemId: '10018', quantity: 1, chance: 0.01, mvp: false },
      { itemId: '10019', quantity: 3, chance: 1, mvp: false },
      { itemId: '5', quantity: 1, chance: 1, mvp: true },
    ],
  },
  {
    id: 104 as const,
    version: 1,
    name: 'Familiar',
    imageUrl: 'https://cdn.charity.games/_mobs/104.png',
    description:
      'A small bat-like creature that is usually found in dark places. A sorcerer seems to have lost control of it.',
    maxHp: 800,
    level: 2,
    race: MobRace.DEMON,
    element: MobElement.SHADOW_1,
    size: MobSize.SMALL,
    attack: 5,
    defense: 1,
    baseExp: 200,
    mvpExp: 200,
    loot: [
      { itemId: '2', quantity: 1, chance: 0.1, mvp: false },
      { itemId: '1001', quantity: 1, chance: 0.2, mvp: false },
      { itemId: '10020', quantity: 2, chance: 0.05, mvp: false },
      { itemId: '10021', quantity: 1, chance: 0.1, mvp: false },
      { itemId: '10022', quantity: 3, chance: 0.3, mvp: false },
      { itemId: '10023', quantity: 5, chance: 0.25, mvp: false },
      { itemId: '10024', quantity: 2, chance: 0.75, mvp: false },
      { itemId: '5', quantity: 1, chance: 1, mvp: true },
    ],
  },
];

export type Mob = (typeof MOBS)[number];

export type MobId = Mob['id'];

export const mobIdSchema = z.custom<MobId>();

export const parseMonsterId = (id: unknown): MobId => {
  const monsterId = Number(id);
  if (MOBS.some((mob) => mob.id === monsterId)) {
    return monsterId as MobId;
  } else {
    throw new Error(`Invalid monster id ${id}`);
  }
};
