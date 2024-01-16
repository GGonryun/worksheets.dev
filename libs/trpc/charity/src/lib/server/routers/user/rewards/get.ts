import { TRPCError } from '@trpc/server';
import {
  MAX_TOKENS_FROM_REFERRAL_PLAYS,
  MAX_TOKENS_PER_DAY,
  MOMENTUM_MULTIPLIER,
} from '@worksheets/util/settings';
import { createReferralLink } from '@worksheets/util/urls';
import { z } from '@worksheets/zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .output(
    z.object({
      totalTokens: z.number(),
      gamePlayTokens: z.number(),
      giftBoxes: z.number(),
      claimedDailyReward: z.boolean(),
      referralTokens: z.number(),
      numReferrals: z.number(),
      referralLink: z.string(),
      dailyMomentum: z.number(),
    })
  )
  .query(async ({ ctx: { db, user } }) => {
    const userId = user.id;
    console.info(`Getting rewards for user ${userId}`);

    const [userData, rewards] = await Promise.all([
      db.user.findFirst({
        where: {
          id: userId,
        },
        include: {
          referred: true,
        },
      }),
      db.rewards.findFirst({
        where: {
          userId,
        },
      }),
    ]);

    if (!userData || !rewards) {
      console.error('Rewards or user was not found', { userId });
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Rewards data or user was not found',
      });
    }

    return {
      totalTokens: rewards.totalTokens,
      gamePlayTokens: MAX_TOKENS_PER_DAY - rewards.availableGamePlayTokens,
      referralTokens:
        MAX_TOKENS_FROM_REFERRAL_PLAYS - rewards.availableReferralTokens,
      giftBoxes: rewards.giftBoxes,
      claimedDailyReward: rewards.claimedDailyReward,
      numReferrals: userData.referred.length,
      referralLink: createReferralLink(user.id),
      dailyMomentum: rewards.dailyRewardMomentum * MOMENTUM_MULTIPLIER,
    };
  });
