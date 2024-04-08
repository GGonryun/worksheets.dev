import { TRPCError } from '@trpc/server';
import { routes } from '@worksheets/routes';
import { dailyBonusGames } from '@worksheets/util/settings';
import { basicGameDetailsSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .output(
    z.object({
      totalTokens: z.number(),
      giftBoxes: z.number(),
      numReferrals: z.number(),
      referralLink: z.string(),
      bonusGames: basicGameDetailsSchema.array(),
    })
  )
  .query(async ({ ctx: { db, user } }) => {
    const userId = user.id;

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
      console.error('Required user data was not found', { userId });
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Rewards data or user was not found',
      });
    }

    return {
      totalTokens: userData.rewards.totalTokens,
      giftBoxes: userData.rewards.giftBoxes,
      numReferrals: userData.referred.length,
      referralLink: routes.ref.url({
        params: { code: userData.referralCode.code },
      }),
      bonusGames: dailyBonusGames,
    };
  });
