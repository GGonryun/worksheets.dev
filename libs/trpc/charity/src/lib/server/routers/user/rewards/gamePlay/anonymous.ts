import { TOKENS_PER_REFERRAL_PLAY } from '@worksheets/util/settings';
import { z } from '@worksheets/zod';

import { publicProcedure } from '../../../../procedures';

export default publicProcedure
  .input(
    z.object({
      referralCode: z.string(),
    })
  )
  .output(
    z.object({
      okay: z.boolean(),
    })
  )
  .mutation(async ({ input: { referralCode }, ctx: { db } }) => {
    const referral = await db.referralCode.findFirst({
      where: {
        code: referralCode,
      },
    });

    if (!referral) {
      console.warn('Referral code does not exist', { referralCode });
      return { okay: false };
    }

    const rewards = await db.rewards.findFirst({
      where: {
        userId: referral.userId,
      },
    });

    if (!rewards) {
      console.error('Rewards not found', { userId: referral.userId });
      return { okay: false };
    }

    if (rewards.availableReferralTokens <= 0) {
      console.info('All referral tokens consumed for user', {
        userId: referral.userId,
      });
      return { okay: false };
    }

    await db.rewards.update({
      where: {
        userId: referral.userId,
      },
      data: {
        totalTokens: {
          increment: TOKENS_PER_REFERRAL_PLAY,
        },
        availableReferralTokens: {
          decrement: TOKENS_PER_REFERRAL_PLAY,
        },
      },
    });

    console.info(`Added referral game play reward`, { referral: referral.id });
    return {
      okay: true,
    };
  });