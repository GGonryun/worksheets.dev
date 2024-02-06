import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .input(
    z.object({
      prizeId: z.string(),
      numEntries: z.number().int().positive(),
    })
  )
  .output(z.object({}))
  .mutation(async ({ input: { prizeId, numEntries }, ctx: { db, user } }) => {
    // get the prize to compute the cost.
    const prize = await db.rafflePrize.findFirst({
      where: {
        id: prizeId,
      },
    });

    if (!prize) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Prize does not exist',
      });
    }

    if (prize.expiresAt < new Date()) {
      throw new TRPCError({
        code: 'PRECONDITION_FAILED',
        message: 'Prize has expired',
      });
    }

    const totalCost = prize.costPerEntry * numEntries;

    // check if the user has enough points
    const rewards = await db.rewards.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (!rewards) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'User rewards not found',
      });
    }

    if (rewards.totalTokens < totalCost) {
      throw new TRPCError({
        code: 'PRECONDITION_FAILED',
        message: 'insufficient points',
      });
    }

    // purchase the tickets
    await db.$transaction(async (tx) => {
      await tx.raffleTicket.createMany({
        data: Array.from({ length: numEntries }, () => ({
          userId: user.id,
          prizeId,
        })),
      });

      await tx.rewards.update({
        where: {
          id: rewards.id,
        },
        data: {
          totalTokens: {
            decrement: totalCost,
          },
        },
      });
    });

    // all good
    return {};
  });
