import { PrismaClient } from '@prisma/client';
import { dailyBonusGames } from '@worksheets/data-access/charity-games';
import {
  BONUS_GAMES_MULTIPLIER,
  GIFT_BOX_DROP_RATE,
  MAX_TOKENS_PER_GAME,
  TOKENS_PER_REFERRAL_PLAY,
} from '@worksheets/util/settings';
import { z } from '@worksheets/zod';

import { protectedProcedure } from '../../../../procedures';

export default protectedProcedure
  .input(
    z.object({
      gameId: z.string(),
    })
  )
  .output(
    z.object({
      okay: z.boolean(),
      earnedGiftBox: z.boolean(),
      tokensEarned: z.number(),
    })
  )
  .mutation(async ({ input: { gameId }, ctx: { user, db } }) => {
    const userId = user.id;
    console.info(`registering game play for user`, { userId, gameId });

    const [result] = await Promise.all([
      giveUserReward(db, userId, gameId),
      giveRefererReward(db, user.referredByUserId),
    ]);

    return {
      okay: true,
      earnedGiftBox: result?.wonGiftBox ?? false,
      tokensEarned: result?.tokensEarned ?? 0,
    };
  });

const giveUserReward = async (
  db: PrismaClient,
  userId: string,
  gameId: string
) => {
  const rewards = await db.rewards.findFirst({
    where: {
      userId,
    },
  });

  if (!rewards) {
    console.warn('Rewards not found for user', { userId });
    return;
  }

  if (rewards.availableGamePlayTokens < 1) {
    console.warn('User does not have enough game play tokens', { userId });
    return;
  }

  // roll for gift box
  const wonGiftBox = Math.random() < GIFT_BOX_DROP_RATE / 100;
  const isBonusGame = dailyBonusGames.some((game) => game.id === gameId);
  const tokenMultiplier = isBonusGame ? BONUS_GAMES_MULTIPLIER : 1;
  const possibleTokensEarned = MAX_TOKENS_PER_GAME * tokenMultiplier;
  const tokensEarned = Math.floor(Math.random() * possibleTokensEarned) + 1;

  await db.rewards.update({
    where: {
      id: rewards.id,
    },
    data: {
      giftBoxes: {
        increment: wonGiftBox ? 1 : 0,
      },
      availableGamePlayTokens: {
        decrement: tokensEarned,
      },
      totalTokens: {
        increment: tokensEarned,
      },
    },
  });

  console.info(`Added game play reward for user`, {
    wonGiftBox,
    userId,
    tokensEarned,
  });

  return { wonGiftBox, tokensEarned };
};

const giveRefererReward = async (
  db: PrismaClient,
  referralUserId: string | null
) => {
  if (!referralUserId) {
    console.debug('No referral user id set');
    return;
  }

  const rewards = await db.rewards.findFirst({
    where: {
      userId: referralUserId,
    },
  });

  if (!rewards) {
    console.error('Rewards for referral user not found', { referralUserId });
    return;
  }

  if (rewards.availableReferralTokens < 1) {
    console.debug('Referrer has already received max tokens', {
      referralUserId,
    });
    return;
  }

  await db.rewards.update({
    where: {
      id: rewards.id,
    },
    data: {
      availableReferralTokens: {
        decrement: TOKENS_PER_REFERRAL_PLAY,
      },
      totalTokens: {
        increment: TOKENS_PER_REFERRAL_PLAY,
      },
    },
  });

  console.info('Added referral reward for user', { referralUserId });
};
