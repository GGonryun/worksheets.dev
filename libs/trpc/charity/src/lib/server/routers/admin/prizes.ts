import { TRPCError } from '@trpc/server';
import { prizeDetails, prizeSummary } from '@worksheets/util/types';
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
    .output(prizeSummary.array())
    .query(async ({ input: { take, skip }, ctx: { db } }) => {
      const prizes = await db.prize.findMany({
        take,
        skip,
        select: {
          id: true,
          name: true,
          _count: {
            select: {
              raffles: true,
            },
          },
          createdAt: true,
        },
      });
      return prizes.map((prize) => ({
        prizeId: prize.id,
        name: prize.name,
        raffles: prize._count.raffles,
        createdAt: prize.createdAt.getTime(),
      }));
    }),
  find: adminProcedure
    .input(
      z.object({
        prizeId: z.string(),
      })
    )
    .output(prizeDetails)
    .query(async ({ input: { prizeId }, ctx: { db } }) => {
      const prize = await db.prize.findFirst({
        where: {
          id: prizeId,
        },
        select: {
          id: true,
          name: true,
          description: true,
          imageUrl: true,
          createdAt: true,
          updatedAt: true,
          raffles: {
            select: {
              id: true,
              _count: {
                select: {
                  participants: true,
                },
              },
            },
          },
          codes: {
            select: {
              id: true,
            },
          },
          winners: {
            select: {
              id: true,
            },
          },
        },
      });

      if (!prize) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Prize not found',
        });
      }

      return {
        prizeId: prize.id,
        name: prize.name,
        description: prize.description,
        imageUrl: prize.imageUrl,
        raffles: prize.raffles.map((raffle) => ({
          raffleId: raffle.id,
          participants: raffle._count.participants,
        })),
        codes: prize.codes.map((code) => ({
          codeId: code.id,
        })),
        winners: prize.winners.map((winner) => ({
          winnerId: winner.id,
        })),
        createdAt: prize.createdAt.getTime(),
        updatedAt: prize.updatedAt.getTime(),
      };
    }),
});
