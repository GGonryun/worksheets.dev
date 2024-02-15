import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';
import { t } from '../../../trpc';

export default t.router({
  waitlist: t.router({
    get: protectedProcedure
      .output(z.boolean())
      .query(async ({ ctx: { db, user } }) => {
        const waitlisted = await db.vipMembershipWaitlist.findFirst({
          where: {
            userId: user.id,
          },
        });

        return Boolean(waitlisted);
      }),
    join: protectedProcedure
      .output(z.object({ success: z.boolean() }))
      .mutation(async ({ ctx: { db, user } }) => {
        try {
          await db.vipMembershipWaitlist.create({
            data: {
              userId: user.id,
            },
          });
        } catch (error) {
          throw new TRPCError({
            code: 'PRECONDITION_FAILED',
            message: 'You are already on the waitlist',
          });
        }

        return {
          success: true,
        };
      }),
  }),
});
