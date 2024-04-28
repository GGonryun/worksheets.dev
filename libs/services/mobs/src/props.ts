import { Prisma } from '@worksheets/prisma';

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
