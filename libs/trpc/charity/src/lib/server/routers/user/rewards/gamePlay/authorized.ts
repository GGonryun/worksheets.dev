import { Prisma, PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { routes } from '@worksheets/ui/routes';
import { TokensPanels } from '@worksheets/util/enums';
import {
  BONUS_GAMES_MULTIPLIER,
  dailyBonusGames,
  GIFT_BOX_DROP_RATE,
  MAX_TOKENS_PER_GAME,
  TOKENS_PER_REFERRAL_PLAY,
} from '@worksheets/util/settings';
import { z } from 'zod';

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

    const game = await db.game.findFirst({
      where: {
        id: gameId,
      },
      select: {
        id: true,
        title: true,
      },
    });

    if (!game) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Game not found',
      });
    }

    const [result] = await Promise.all([
      giveUserReward(db, userId, game),
      giveRefererReward(db, user.referredByUserId),
    ]);

    return {
      okay: true,
      earnedGiftBox: result?.wonGiftBox ?? false,
      tokensEarned: result?.tokensEarned ?? 0,
    };
  });

type GameType = Prisma.GameGetPayload<{
  select: {
    id: true;
    title: true;
  };
}>;

const giveUserReward = async (
  db: PrismaClient,
  userId: string,
  game: GameType
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
  const isBonusGame = dailyBonusGames.some((g) => g.id === game.id);
  const tokenMultiplier = isBonusGame ? BONUS_GAMES_MULTIPLIER : 1;
  const possibleTokensEarned = MAX_TOKENS_PER_GAME * tokenMultiplier;
  const tokensEarned = Math.floor(Math.random() * possibleTokensEarned) + 1;

  await Promise.all([
    sendNotificationOnGiftBox(db, userId, game, wonGiftBox),
    db.rewards.update({
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
    }),
  ]);

  console.info(`Added game play reward for user`, {
    wonGiftBox,
    userId,
    tokensEarned,
  });

  return { wonGiftBox, tokensEarned };
};

const sendNotificationOnGiftBox = async (
  db: PrismaClient,
  userId: string,
  game: GameType,
  wonGiftBox: boolean
) => {
  if (wonGiftBox) {
    await db.notification.create({
      data: {
        userId,
        type: 'REWARD',
        text: `You found a gift box while playing <a href="${routes.game.path({
          params: { gameId: game.id },
        })}">${
          game.title
        }</a>! Visit your <a href="${routes.account.tokens.path({
          bookmark: TokensPanels.GiftBoxes,
        })}">account</a> to claim your reward.`,
      },
    });
  }
};

const giveRefererReward = async (
  db: PrismaClient,
  referralUserId: string | null
) => {
  if (!referralUserId) {
    console.info('No referral user id set');
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
    console.info('Referrer has already received max tokens', {
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
