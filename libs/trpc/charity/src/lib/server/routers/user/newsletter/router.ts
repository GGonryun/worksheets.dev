import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';
import { t } from '../../../trpc';

export default t.router({
  subscription: protectedProcedure

    .output(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx: { db, user } }) => {
      const subscription = await db.newsletterSubscription.findFirst({
        where: {
          email: user.email,
        },
      });

      if (!subscription) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Subscription does not exist',
        });
      }

      return subscription;
    }),
});
