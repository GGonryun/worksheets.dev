import { TRPCError } from '@trpc/server';
import { winnerDetails, winnerSummary } from '@worksheets/util/types';
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
    .output(winnerSummary.array())
    .query(async ({ input: { take, skip }, ctx: { db } }) => {
      const winners = await db.raffleWinner.findMany({
        take,
        skip,
        select: {
          id: true,
          createdAt: true,
          claimedAt: true,
        },
      });

      return winners.map((winner) => ({
        winnerId: winner.id,
        createdAt: winner.createdAt.getTime(),
        claimedAt: winner.claimedAt?.getTime() ?? null,
      }));
    }),
  find: adminProcedure
    .input(
      z.object({
        winnerId: z.string(),
      })
    )
    .output(winnerDetails)
    .query(async ({ input: { winnerId }, ctx: { db } }) => {
      const winner = await db.raffleWinner.findFirst({
        where: {
          id: winnerId,
        },
        select: {
          id: true,
          raffleId: true,
          prizeId: true,
          participationId: true,
          userId: true,
          codeId: true,
          createdAt: true,
          claimedAt: true,
          alert: {
            select: {
              id: true,
              createdAt: true,
              lastSentAt: true,
              sentCount: true,
            },
          },
        },
      });

      if (!winner) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Winner not found',
        });
      }

      return {
        winnerId: winner.id,
        raffleId: winner.raffleId,
        prizeId: winner.prizeId,
        participationId: winner.participationId,
        userId: winner.userId,
        codeId: winner.codeId ?? null,
        createdAt: winner.createdAt.getTime(),
        claimedAt: winner.claimedAt?.getTime() ?? null,
        alert: winner.alert
          ? {
              alertId: winner.alert.id,
              createdAt: winner.alert.createdAt.getTime(),
              lastSentAt: winner.alert.lastSentAt?.getTime() ?? null,
              sentCount: winner.alert.sentCount,
            }
          : null,
      };
    }),
});
