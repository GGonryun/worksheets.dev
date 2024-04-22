import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';
import { t } from '../../../trpc';
import get from './get';

export default t.router({
  get,
  code: protectedProcedure
    .output(z.string())
    .query(async ({ ctx: { db, user } }) => {
      const referralCode = await db.referralCode.findFirst({
        where: {
          userId: user.id,
        },
        select: {
          code: true,
        },
      });

      if (!referralCode) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Referral code not found',
        });
      }

      return referralCode.code;
    }),
});
