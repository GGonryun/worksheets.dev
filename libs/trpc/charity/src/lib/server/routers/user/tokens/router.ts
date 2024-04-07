import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';
import { t } from '../../../trpc';

export default t.router({
  count: protectedProcedure
    .output(z.number())
    .query(async ({ ctx: { db, user } }) => {
      const rewards = await db.rewards.findFirst({
        where: {
          userId: user.id,
        },
        select: {
          totalTokens: true,
        },
      });

      if (!rewards) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Rewards data or user was not found, please try again later',
        });
      }

      return rewards.totalTokens;
    }),
});
