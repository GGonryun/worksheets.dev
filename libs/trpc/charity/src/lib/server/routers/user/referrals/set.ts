import {
  GIFT_BOXES_PER_REFERRAL_ACCOUNT,
  TOKENS_PER_REFERRAL_ACCOUNT,
} from '@worksheets/util/settings';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .input(
    z.object({
      referralCode: z.string().nullable(),
    })
  )
  .output(
    z.object({
      okay: z.boolean(),
    })
  )
  .mutation(async ({ ctx: { user, db }, input: { referralCode } }) => {
    const userId = user.id;
    const okay = {
      okay: true,
    };

    if (!referralCode) {
      console.info('Ignoring empty referralCode', { userId });
      return okay;
    }

    if (user.referredByUserId) {
      console.warn(
        `User ${userId} attempted to set a new referrer to ${referralCode} but they already have a referral set.`
      );
      return okay;
    }

    const referral = await db.referralCode.findFirst({
      where: {
        code: referralCode,
      },
    });

    if (!referral) {
      console.error('User attempted to set invalid referral code', {
        userId,
        referralCode,
      });
      return okay;
    }

    if (referral.userId === userId) {
      console.error('User attempted to refer themselves', {
        userId,
        referralCode,
      });
      return okay;
    }

    await Promise.all([
      db.user.update({
        where: {
          id: userId,
        },
        data: {
          referredByUserId: referral.userId,
        },
      }),

      db.rewards.update({
        where: {
          userId: referral.userId,
        },
        data: {
          totalTokens: {
            increment: TOKENS_PER_REFERRAL_ACCOUNT,
          },
          giftBoxes: {
            increment: GIFT_BOXES_PER_REFERRAL_ACCOUNT,
          },
        },
      }),

      db.notification.create({
        data: {
          userId: referral.userId,
          type: 'SYSTEM',
          text: `You have a new referral! Someone has used your referral code to sign up. You have received ${TOKENS_PER_REFERRAL_ACCOUNT} tokens and ${GIFT_BOXES_PER_REFERRAL_ACCOUNT} gift boxes.`,
        },
      }),

      db.friendship.create({
        data: {
          userId,
          friendId: referral.userId,
        },
      }),

      db.friendship.create({
        data: {
          userId: referral.userId,
          friendId: userId,
        },
      }),
    ]);

    return okay;
  });
