import { TRPCError } from '@trpc/server';
import { raffleDetails, raffleSummary } from '@worksheets/util/types';
import { z } from 'zod';

import { adminProcedure } from '../../procedures';
import { t } from '../../trpc';

export default t.router({
  list: adminProcedure
    .input(
      z.object({
        take: z.number(),
        skip: z.number(),
      })
    )
    .output(raffleSummary.array())
    .query(async ({ input: { take, skip }, ctx: { db } }) => {
      const raffles = await db.raffle.findMany({
        take,
        skip,
        select: {
          id: true,
          prizeId: true,
          status: true,
          createdAt: true,
          expiresAt: true,
          _count: {
            select: {
              participants: true,
            },
          },
        },
      });

      return raffles.map((raffle) => ({
        raffleId: raffle.id,
        expiresAt: raffle.expiresAt.getTime(),
        createdAt: raffle.createdAt.getTime(),
        participants: raffle._count.participants,
        status: raffle.status,
      }));
    }),
  find: adminProcedure
    .input(
      z.object({
        raffleId: z.number(),
      })
    )
    .output(raffleDetails)
    .query(async ({ input: { raffleId }, ctx: { db } }) => {
      const raffle = await db.raffle.findFirst({
        where: {
          id: raffleId,
        },
        select: {
          id: true,
          prizeId: true,
          status: true,
          expiresAt: true,
          createdAt: true,
          numWinners: true,
          codes: {
            select: {
              id: true,
            },
          },
          winners: {
            select: {
              userId: true,
            },
          },
          participants: {
            select: {
              userId: true,
              numEntries: true,
            },
          },
        },
      });

      if (!raffle) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Raffle not found',
        });
      }

      return {
        raffleId: raffle.id,
        prizeId: raffle.prizeId,
        status: raffle.status,
        createdAt: raffle.createdAt.getTime(),
        expiresAt: raffle.expiresAt.getTime(),
        numWinners: raffle.numWinners,
        participants: raffle.participants.map((p) => ({
          userId: p.userId,
          numEntries: p.numEntries,
        })),
        winners: raffle.winners.map((winner) => ({
          winnerId: winner.userId,
        })),
        codes: raffle.codes.map((code) => ({
          codeId: code.id,
        })),
      };
    }),
});
