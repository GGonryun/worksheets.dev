import { Prisma } from '@worksheets/prisma';

export const EXPIRED_RAFFLE_PROPS = {
  id: true,
  numWinners: true,
  expiresAt: true,
  item: {
    select: {
      id: true,
      name: true,
      expiration: true,
    },
  },
  participants: {
    select: {
      user: {
        select: {
          id: true,
          email: true,
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
