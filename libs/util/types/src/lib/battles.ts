import { BattleStatus, MvpReason } from '@worksheets/prisma';
import { z } from 'zod';

import { lootSchema } from './items';
import { MonsterSchema, monsterSchema } from './monsters';
import { SORT_DIRECTION } from './sort';

export const battleSchema = z.object({
  id: z.number(),
  status: z.nativeEnum(BattleStatus),
  mob: monsterSchema,
  damage: z.number(),
});

export type BattleSchema = z.infer<typeof battleSchema>;

export const BATTLE_SORT = {
  NAME: 'Name',
  LEVEL: 'Level',
  MAX_HP: 'Max HP',
} as const;

export type BattleSortKey = keyof typeof BATTLE_SORT;

export type BattleSortValue = (typeof BATTLE_SORT)[keyof typeof BATTLE_SORT];

export const battleFiltersSchema = z
  .object({
    monsterId: z.number(),
    status: z.nativeEnum(BattleStatus).array(),
    search: z.string(),
    sort: z.nativeEnum(BATTLE_SORT),
    direction: z.nativeEnum(SORT_DIRECTION),
  })
  .partial();

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
    damage: z.number(),
    mob: z.object({
      id: z.number(),
      name: z.string(),
      maxHp: z.number(),
    }),
  }),
  damage: z.number(),
  strikes: z.number(),
});

export type UserBattleParticipationSchema = z.infer<
  typeof userBattleParticipationSchema
>;

export const calculateCurrentHp = (battle: BattleSchema) =>
  battle.mob.maxHp - battle.damage;

export const isBattleComplete = (
  battle: Pick<BattleSchema, 'status' | 'damage'> & {
    mob: Pick<MonsterSchema, 'maxHp'>;
  }
) =>
  battle.status === BattleStatus.COMPLETE || battle.damage >= battle.mob.maxHp;
