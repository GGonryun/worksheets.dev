import { TRPCError } from '@trpc/server';
import { BASE_DAILY_REWARD } from '@worksheets/util/settings';
import { z } from 'zod';

import { protectedProcedure } from '../../../../procedures';

export default protectedProcedure
  .output(
    z.object({
      okay: z.boolean(),
    })
  )
  .mutation(async ({ ctx: { db, user } }) => {
    const userId = user.id;
    console.info(`claiming daily reward for user `, { userId });

    // get user rewards.
    const reward = await db.rewards.findFirst({
      where: {
        userId,
      },
    });

    if (!reward) {
      console.warn(`user ${userId} does not have a reward record.`);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'User does not have a reward record. Please contact support.',
      });
    }

    if (reward.claimedDailyReward) {
      console.warn(`user ${userId} has already claimed their daily reward.`);
      throw new TRPCError({
        code: 'PRECONDITION_FAILED',
        message: 'Daily reward has already been claimed',
      });
    }

    await db.rewards.update({
      where: {
        id: reward.id,
        userId: userId,
      },
      data: {
        claimedDailyReward: new Date(),
        totalTokens: {
          increment: BASE_DAILY_REWARD,
        },
      },
    });

    return { okay: true };
  });
