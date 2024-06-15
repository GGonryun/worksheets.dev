import { z } from 'zod';

import { publicProcedure } from '../../../procedures';
import { t } from '../../../trpc';

export default t.router({
  get: publicProcedure
    .input(z.string())
    .output(
      z
        .object({
          id: z.string(),
          username: z.string(),
        })
        .nullable()
    )
    .query(async ({ ctx: { db }, input: code }) => {
      const referral = await db.referralCode.findFirst({
        where: {
          code,
        },
        include: {
          user: true,
        },
      });

      if (!referral) {
        return null;
      }

      return {
        id: referral.user.id,
        username: referral.user.username,
      };
    }),
});
