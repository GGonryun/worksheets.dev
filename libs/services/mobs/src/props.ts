import { Prisma } from '@worksheets/prisma';
import { BossBattleSchema } from '@worksheets/util/types';

export const BOSS_BATTLE_PROPS = {
  id: true,
  damage: true,
  status: true,
  mob: {
    select: {
      id: true,
      name: true,
      description: true,
      imageUrl: true,
      maxHp: true,
      level: true,
      race: true,
      element: true,
      size: true,
      attack: true,
      defense: true,
      baseExp: true,
      mvpExp: true,
      loot: {
        select: {
          quantity: true,
          chance: true,
          mvp: true,
          item: {
            select: {
              id: true,
              imageUrl: true,
              name: true,
              type: true,
              description: true,
              sell: true,
            },
          },
        },
      },
    },
  },
} as const;

export type BossBattleProps = Prisma.BattleGetPayload<{
  select: typeof BOSS_BATTLE_PROPS;
}>;

type BattleConverter = (battles: BossBattleProps) => BossBattleSchema;

export const battleConverter: BattleConverter = (battle) => ({
  battleId: battle.id,
  mobId: battle.mob.id,
  name: battle.mob.name,
  imageUrl: battle.mob.imageUrl,
  maxHp: battle.mob.maxHp,
  status: battle.status,
  description: battle.mob.description,
  currentHp: Math.max(0, battle.mob.maxHp - battle.damage),
  level: battle.mob.level,
  race: battle.mob.race,
  element: battle.mob.element,
  size: battle.mob.size,
  attack: battle.mob.attack,
  defense: battle.mob.defense,
  baseExp: battle.mob.baseExp,
  mvpExp: battle.mob.mvpExp,
  basicLoot: battle.mob.loot.filter((l) => !l.mvp),
  mvpLoot: battle.mob.loot.filter((l) => l.mvp),
});

export const EXPIRED_BATTLE_PROPS = {
  id: true,
  damage: true,
  status: true,
  mob: {
    select: {
      id: true,
      maxHp: true,
      name: true,
      loot: {
        select: {
          quantity: true,
          chance: true,
          mvp: true,
          itemId: true,
        },
      },
    },
  },
} as const;

export type ExpiredBattleProps = Prisma.BattleGetPayload<{
  select: typeof EXPIRED_BATTLE_PROPS;
}>;

export const BASIC_PARTICIPATION_PROPS = {
  id: true,
  damage: true,
  strikes: true,
  struckAt: true,
  user: {
    select: {
      id: true,
      username: true,
    },
  },
} as const;

export type BasicParticipationProps = Prisma.BattleParticipationGetPayload<{
  select: typeof BASIC_PARTICIPATION_PROPS;
}>;
