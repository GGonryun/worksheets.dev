import { TRPCError } from '@trpc/server';
import { createReferralLink } from '@worksheets/util/urls';
import { z } from '@worksheets/zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .output(
    z.object({
      referrals: z.array(
        z.object({
          username: z.string(),
          createdAt: z.number(),
        })
      ),
      numReferrals: z.number(),
      referralLink: z.string(),
      okay: z.literal(true),
    })
  )
  .query(async ({ ctx: { db, user } }) => {
    const userId = user.id;
    console.info(`Getting rewards for user ${userId}`);

    const userData = await db.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        referred: true,
      },
    });

    if (!userData) {
      console.error('Referrals for user were not found', { userId });
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Referrals for user was not found',
      });
    }

    return {
      okay: true,
      referrals: userData.referred.map((referral) => ({
        username: referral.username,
        createdAt: referral.createdAt.getTime(),
      })),
      numReferrals: userData.referred.length,
      referralLink: createReferralLink(user.id),
    };
  });
