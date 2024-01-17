import { TRPCError } from '@trpc/server';
import { MAX_TOKENS_IN_GIFT_BOX } from '@worksheets/util/settings';
import { z } from 'zod';

import { protectedProcedure } from '../../../../procedures';

export default protectedProcedure
  .output(
    z.object({
      tokensAwarded: z.number(),
    })
  )
  .mutation(async ({ ctx: { user, db } }) => {
    const rewards = await db.rewards.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (!rewards) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message:
          'No rewards found. Try again, or contact support if the error persists.',
      });
    }

    if (rewards.giftBoxes <= 0) {
      throw new TRPCError({
        code: 'PRECONDITION_FAILED',
        message: "You don't have any gift boxes to open.",
      });
    }

    const tokensAwarded =
      Math.floor(Math.random() * MAX_TOKENS_IN_GIFT_BOX) + 1;

    await db.rewards.update({
      where: {
        id: rewards.id,
      },
      data: {
        giftBoxes: {
          decrement: 1,
        },
        totalTokens: {
          increment: tokensAwarded,
        },
      },
    });

    return {
      tokensAwarded,
    };
  });
