import { z } from '@worksheets/zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .input(
    z.object({
      referredByUserId: z.string().nullable(),
    })
  )
  .output(
    z.object({
      okay: z.boolean(),
    })
  )
  .mutation(async ({ ctx: { user, db }, input: { referredByUserId } }) => {
    const userId = user.id;
    const okay = {
      okay: true,
    };

    if (!referredByUserId) {
      console.info('Ignoring empty referredByUserId', { userId });
      return okay;
    }

    if (user.referredByUserId) {
      console.warn(
        `User ${userId} attempted to set referredByUserId to ${referredByUserId} but they already have a referral set.`
      );
      return okay;
    }

    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        referredByUserId,
      },
    });

    return okay;
  });
