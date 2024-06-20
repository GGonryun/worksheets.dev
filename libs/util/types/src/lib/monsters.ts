import {
  COMBAT_ITEM_DAMAGE,
  COMBAT_ITEM_ELEMENT,
  CombatItemId,
  Resistances,
} from '@worksheets/data/items';
import { MobElement, MobRace, MobSize } from '@worksheets/prisma';
import { z } from 'zod';

import { mobLootSchema } from './items';

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

export const monsterSchema = z.object({
  id: z.number(),
  name: z.string(),
  imageUrl: z.string(),
  description: z.string(),
  maxHp: z.number(),
  level: z.number(),
  race: z.nativeEnum(MobRace),
  element: z.nativeEnum(MobElement),
  size: z.nativeEnum(MobSize),
  attack: z.number(),
  defense: z.number(),
  baseExp: z.number(),
  mvpExp: z.number(),
  loot: z.array(mobLootSchema),
});

export type MonsterSchema = z.infer<typeof monsterSchema>;

export const calculateCombatDamage = (
  resistances: Resistances,
  selections: Record<string, number>
) =>
  Object.entries(selections).reduce((total, [itemId, quantity]) => {
    const damage = COMBAT_ITEM_DAMAGE[itemId as CombatItemId] ?? 1;
    const element = COMBAT_ITEM_ELEMENT[itemId as CombatItemId] ?? 'neutral';
    const resistance = resistances[element];
    return Math.floor(total + damage * quantity * resistance);
  }, 0);

export const battleLogSchema = z.object({
  battleId: z.number(),
  id: z.number(),
  message: z.string(),
  createdAt: z.string(),
});

export type BattleLogSchema = z.infer<typeof battleLogSchema>;
