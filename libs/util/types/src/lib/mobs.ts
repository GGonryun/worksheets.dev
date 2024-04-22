import {
  BattleStatus,
  ItemType,
  MobElement,
  MobRace,
  MobSize,
  MvpReason,
} from '@worksheets/prisma';
import { z } from 'zod';

import { SORT_DIRECTION } from './sort';

export type Resistances = {
  neutral: number;
  water: number;
  earth: number;
  fire: number;
  wind: number;
  poison: number;
  holy: number;
  shadow: number;
  ghost: number;
  undead: number;
};

export const MOB_ELEMENT_RESISTANCES: Record<MobElement, Resistances> = {
  NEUTRAL_1: {
    neutral: 1,
    water: 1,
    earth: 1,
    fire: 1,
    wind: 1,
    poison: 1,
    holy: 1,
    shadow: 1,
    ghost: 0.25,
    undead: 1,
  },
  WATER_1: {
    neutral: 1,
    water: 0.25,
    earth: 1,
    fire: 0.5,
    wind: 1.75,
    poison: 1,
    holy: 1,
    shadow: 1,
    ghost: 1,
    undead: 1,
  },
  EARTH_1: {
    neutral: 1,
    water: 1,
    earth: 1,
    fire: 1.5,
    wind: 0.5,
    poison: 1.25,
    holy: 1,
    shadow: 1,
    ghost: 1,
    undead: 1,
  },
  FIRE_1: {
    neutral: 1,
    water: 1.5,
    earth: 0.5,
    fire: 0.25,
    wind: 1,
    poison: 1.25,
    holy: 1,
    shadow: 1,
    ghost: 1,
    undead: 1,
  },
  WIND_1: {
    neutral: 1,
    water: 0.5,
    earth: 1.5,
    fire: 1,
    wind: 0.25,
    poison: 1.25,
    holy: 1,
    shadow: 1,
    ghost: 1,
    undead: 1,
  },
  POISON_1: {
    neutral: 1,
    water: 1,
    earth: 1,
    fire: 1,
    wind: 1,
    poison: 0,
    holy: 1,
    shadow: 0.5,
    ghost: 1,
    undead: 0.5,
  },
  HOLY_1: {
    neutral: 1,
    water: 0.75,
    earth: 0.75,
    fire: 0.75,
    wind: 0.75,
    poison: 0.75,
    holy: 0,
    shadow: 1.25,
    ghost: 0.75,
    undead: 1,
  },
  SHADOW_1: {
    neutral: 1,
    water: 1,
    earth: 1,
    fire: 1,
    wind: 1,
    poison: 1,
    holy: 1,
    shadow: 0,
    ghost: 0.75,
    undead: 0,
  },
  GHOST_1: {
    neutral: 0.25,
    water: 1,
    earth: 1,
    fire: 1,
    wind: 1,
    poison: 1,
    holy: 1,
    shadow: 1,
    ghost: 1.25,
    undead: 1,
  },
  UNDEAD_1: {
    neutral: 1,
    water: 1,
    earth: 1,
    fire: 1.25,
    wind: 1,
    poison: 0,
    holy: 1.5,
    shadow: 0,
    ghost: 1,
    undead: 0,
  },
};

export const MOB_RACE_LABEL: Record<MobRace, string> = {
  FORMLESS: 'Formless',
  UNDEAD: 'Undead',
  BEAST: 'Beast',
  PLANT: 'Plant',
  INSECT: 'Insect',
  FISH: 'Fish',
  DEMON: 'Demon',
  HUMANOID: 'Humanoid',
  MACHINE: 'Mechanical',
  ANGEL: 'Angel',
  DRAGON: 'Dragon',
};

export const MOB_ELEMENT_LABEL: Record<MobElement, string> = {
  NEUTRAL_1: 'Neutral',
  WATER_1: 'Water',
  EARTH_1: 'Earth',
  FIRE_1: 'Fire',
  WIND_1: 'Wind',
  POISON_1: 'Poison',
  HOLY_1: 'Holy',
  SHADOW_1: 'Shadow',
  GHOST_1: 'Ghost',
  UNDEAD_1: 'Undead',
};

export const MOB_SIZE_LABEL: Record<MobSize, string> = {
  SMALL: 'Small',
  MEDIUM: 'Medium',
  LARGE: 'Large',
};

export const lootSchema = z.object({
  item: z.object({
    id: z.string(),
    name: z.string(),
    imageUrl: z.string(),
    type: z.nativeEnum(ItemType),
    description: z.string(),
  }),
  quantity: z.number(),
  chance: z.number().min(0).max(1),
  mvp: z.boolean(),
});

export type LootSchema = z.infer<typeof lootSchema>;

export const bossBattleSchema = z.object({
  battleId: z.number(),
  mobId: z.number(),
  name: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  maxHp: z.number(),
  currentHp: z.number(),
  level: z.number(),
  race: z.nativeEnum(MobRace),
  element: z.nativeEnum(MobElement),
  size: z.nativeEnum(MobSize),
  status: z.nativeEnum(BattleStatus),
  attack: z.number(),
  defense: z.number(),
  baseExp: z.number(),
  mvpExp: z.number(),
  basicLoot: lootSchema.array(),
  mvpLoot: lootSchema.array(),
});

export type BossBattleSchema = z.infer<typeof bossBattleSchema>;

export const BATTLE_SORT = {
  NAME: 'Name',
  LEVEL: 'Level',
  MAX_HP: 'Max HP',
} as const;

export type BattleSortKey = keyof typeof BATTLE_SORT;

export type BattleSortValue = (typeof BATTLE_SORT)[keyof typeof BATTLE_SORT];

export const battleFiltersSchema = z.object({
  status: z.nativeEnum(BattleStatus).array(),
  search: z.string(),
  sort: z.nativeEnum(BATTLE_SORT),
  direction: z.nativeEnum(SORT_DIRECTION),
});

export type BattleFiltersSchema = z.infer<typeof battleFiltersSchema>;

export const DEFAULT_BATTLE_FILTERS: BattleFiltersSchema = {
  status: [BattleStatus.ACTIVE],
  search: '',
  sort: BATTLE_SORT.NAME,
  direction: SORT_DIRECTION.ASC,
};

export const battleParticipationSchema = z.object({
  id: z.number(),
  user: z.object({
    id: z.string(),
    username: z.string(),
  }),
  damage: z.number(),
  strikes: z.number(),
  isMvp: z.nativeEnum(MvpReason).nullable(),
  loot: lootSchema.array(),
});

export type BattleParticipationSchema = z.infer<
  typeof battleParticipationSchema
>;

export const MVP_REASON_LABEL: Record<MvpReason, string> = {
  MOST_DAMAGE: '💥 Most Damage',
  MOST_STRIKES: '🗡️ Most Strikes',
  LAST_HIT: '🎯 Last Hit',
};

export const userBattleParticipationSchema = z.object({
  id: z.number(),
  updatedAt: z.number(),
  battle: z.object({
    id: z.number(),
    status: z.nativeEnum(BattleStatus),
    mob: z.object({
      id: z.number(),
      name: z.string(),
    }),
  }),
  damage: z.number(),
  strikes: z.number(),
});

export type UserBattleParticipationSchema = z.infer<
  typeof userBattleParticipationSchema
>;
