import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { protectedProcedure } from '../../../../procedures';
import { t } from '../../../../trpc';
import open from './open';

export default t.router({
  open,
  get: protectedProcedure
    .output(z.number())
    .query(async ({ ctx: { user, db } }) => {
      const rewards = await db.rewards.findFirst({
        where: {
          userId: user.id,
        },
        select: {
          giftBoxes: true,
        },
      });

      if (!rewards) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User rewards not found. Please contact support.',
        });
      }

      return rewards.giftBoxes;
    }),
});
