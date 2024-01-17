import {
  MAX_DAILY_GIFT_BOX_SHARES,
  MAX_TOKENS_FROM_GAME_PLAY_PER_DAY,
  MAX_TOKENS_FROM_REFERRAL_PLAYS,
  STARTING_GIFT_BOXES,
  STARTING_MOMENTUM,
  STARTING_TOKENS,
} from '@worksheets/util/settings';
import { z } from '@worksheets/zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .output(
    z.object({
      okay: z.boolean(),
    })
  )
  .mutation(async ({ ctx: { user, db } }) => {
    const userId = user.id;
    console.info('Creating rewards for user', { userId });

    const rewards = await db.rewards.findFirst({
      where: {
        userId,
      },
    });
    if (rewards) {
      console.warn('Rewards already created for user', { userId });
      return {
        okay: true,
      };
    }

    await db.rewards.create({
      data: {
        userId,
        giftBoxes: STARTING_GIFT_BOXES,
        totalTokens: STARTING_TOKENS,
        dailyRewardMomentum: STARTING_MOMENTUM,
        availableGamePlayTokens: MAX_TOKENS_FROM_GAME_PLAY_PER_DAY,
        availableReferralTokens: MAX_TOKENS_FROM_REFERRAL_PLAYS,
        sharableGiftBoxes: MAX_DAILY_GIFT_BOX_SHARES,
        claimedDailyReward: null,
      },
    });

    return {
      okay: true,
    };
  });
