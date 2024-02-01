import { TRPCError } from '@trpc/server';
import {
  dailyBonusGames,
  MAX_TOKENS_FROM_GAME_PLAY_PER_DAY,
  MAX_TOKENS_FROM_REFERRAL_PLAYS,
} from '@worksheets/util/settings';
import { basicGameDetailsSchema } from '@worksheets/util/types';
import { createReferralLink } from '@worksheets/util/urls';
import { z } from 'zod';

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
      bonusGames: basicGameDetailsSchema.array(),
    })
  )
  .query(async ({ ctx: { db, user } }) => {
    const userId = user.id;
    console.info(`Getting rewards for user ${userId}`);

    const [userData] = await Promise.all([
      db.user.findFirst({
        where: {
          id: userId,
        },
        include: {
          referred: true,
          rewards: true,
          referralCode: true,
        },
      }),
    ]);

    if (!userData || !userData.referralCode || !userData.rewards) {
      console.error('Required user data was not found', { userId });
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Rewards data or user was not found',
      });
    }

    return {
      totalTokens: userData.rewards.totalTokens,
      gamePlayTokens:
        MAX_TOKENS_FROM_GAME_PLAY_PER_DAY -
        userData.rewards.availableGamePlayTokens,
      referralTokens:
        MAX_TOKENS_FROM_REFERRAL_PLAYS -
        userData.rewards.availableReferralTokens,
      giftBoxes: userData.rewards.giftBoxes,
      claimedDailyReward: userData.rewards.claimedDailyReward != null,
      numReferrals: userData.referred.length,
      referralLink: createReferralLink(userData.referralCode.code),
      bonusGames: dailyBonusGames,
    };
  });
