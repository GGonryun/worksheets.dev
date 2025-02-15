import { Prisma } from '@worksheets/prisma';

export const EXPIRED_RAFFLE_PROPS = {
  id: true,
  expiresAt: true,
  prize: {
    select: {
      id: true,
      name: true,
      type: true,
      codeId: true,
    },
  },
  participants: {
    select: {
      user: {
        select: {
          id: true,
          email: true,
          multiplier: true,
        },
      },
      id: true,
      numEntries: true,
    },
  },
} as const;

export type ExpiredRaffle = Prisma.RaffleGetPayload<{
  select: typeof EXPIRED_RAFFLE_PROPS;
}>;
