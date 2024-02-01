import { TRPCError } from '@trpc/server';
import { createReferralLink } from '@worksheets/util/urls';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .output(
    z.object({
      referrals: z.array(
        z.object({
          id: z.string(),
          username: z.string().nullable(),
          createdAt: z.number(),
        })
      ),
      numReferrals: z.number(),
      availableReferralTokens: z.number(),
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
        rewards: true,
        referralCode: true,
      },
    });

    if (!userData || !userData.referralCode || !userData.rewards) {
      console.error('Referrals for user were not found', { userId });
      throw new TRPCError({
        code: 'NOT_FOUND',
        message:
          'Referrals information was not found. Try again. If the problem persists, contact support.',
      });
    }

    return {
      okay: true,
      referrals: userData.referred.map((referral) => ({
        id: referral.id,
        username: referral.username,
        createdAt: referral.createdAt.getTime(),
      })),
      availableReferralTokens: userData.rewards.availableReferralTokens,
      numReferrals: userData.referred.length,
      referralLink: createReferralLink(userData.referralCode.code),
    };
  });
