import { User } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { PrismaClient } from '@worksheets/prisma';
import { sendDiscordMessage } from '@worksheets/services/discord';
import { DISCORD_WEBHOOK_URL } from '@worksheets/services/environment';
import { routes } from '@worksheets/ui/routes';
import { ReferralsPanels, TokensPanels } from '@worksheets/util/enums';
import {
  GIFT_BOXES_PER_REFERRAL_ACCOUNT,
  MAX_DAILY_GIFT_BOX_SHARES,
  MAX_TOKENS_FROM_GAME_PLAY_PER_DAY,
  MAX_TOKENS_FROM_REFERRAL_PLAYS,
  STARTING_GIFT_BOXES,
  STARTING_TOKENS,
  TOKENS_PER_REFERRAL_ACCOUNT,
} from '@worksheets/util/settings';
import { capitalizeFirstLetter } from '@worksheets/util/strings';
import { generateSlug } from 'random-word-slugs';
import { z } from 'zod';

import { protectedProcedure } from '../../procedures';

export default protectedProcedure
  .input(
    z
      .object({
        referralCode: z.string().optional(),
      })
      .optional()
  )

  // returns true if the user was initialized, false if the user was already initialized.
  .output(z.boolean())
  .mutation(async ({ input, ctx: { db, user } }) => {
    // check if user rewards object has been created.
    const exists = await db.rewards.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (exists) {
      return false;
    }

    const MAX_ATTEMPTS = 5;

    await initializeUser(db, user, MAX_ATTEMPTS);
    await setReferralCode(db, user, input?.referralCode);
    await notifyDiscord(user);

    return true;
  });

const initializeUser = async (
  db: PrismaClient,
  user: User,
  attempts: number
) => {
  const { email, id } = user;

  const username = generateSlug(3, {
    format: 'camel',
    partsOfSpeech: ['adjective', 'adjective', 'noun'],
  });
  const code = Math.random().toString(36).substring(2, 8);

  try {
    await db.$transaction([
      db.newsletterSubscription.create({
        data: {
          email,
          subscribed: true,
          confirmed: true,
        },
      }),
      db.notificationPreferences.create({
        data: {
          userId: id,
          email: true,
        },
      }),
      db.rewards.create({
        data: {
          userId: id,
          giftBoxes: STARTING_GIFT_BOXES,
          totalTokens: STARTING_TOKENS,
          availableGamePlayTokens: MAX_TOKENS_FROM_GAME_PLAY_PER_DAY,
          availableReferralTokens: MAX_TOKENS_FROM_REFERRAL_PLAYS,
          sharableGiftBoxes: MAX_DAILY_GIFT_BOX_SHARES,
          claimedDailyReward: null,
        },
      }),
      db.referralCode.create({
        data: {
          userId: id,
          code,
        },
      }),
      db.user.update({
        where: {
          id,
        },
        data: {
          username: capitalizeFirstLetter(username),
        },
      }),
      db.notification.create({
        data: {
          userId: id,
          type: 'SYSTEM',
          text: `Welcome to Charity Games! We've added <a href="${routes.account.tokens.path()}">${STARTING_TOKENS} tokens</a> and <a href="${routes.account.tokens.path(
            {
              bookmark: TokensPanels.GiftBoxes,
            }
          )}">${STARTING_GIFT_BOXES} gift boxes</a> to your account. Spend your tokens on <a href="${routes.raffles.path()}">raffles</a> or <a href="${routes.play.path()}">play games</a> to win more!`,
        },
      }),
    ]);
  } catch (error) {
    if (!attempts) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to initialize user',
      });
    }

    await initializeUser(db, user, attempts - 1);
  }
};

const setReferralCode = async (
  db: PrismaClient,
  user: User,
  referralCode: string | undefined
) => {
  if (!referralCode || user.referredByUserId) {
    return;
  }

  const userId = user.id;

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
    return false;
  }

  if (referral.userId === userId) {
    console.error('User attempted to refer themselves', {
      userId,
      referralCode,
    });
    return false;
  }

  await db.$transaction([
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
        userId: userId,
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
        userId: userId,
        type: 'FRIEND',
        text: `You used a referral link to sign up! You have received an extra <a href="${routes.account.tokens.path()}">${TOKENS_PER_REFERRAL_ACCOUNT} tokens</a> and <a href="${routes.account.tokens.path(
          {
            bookmark: TokensPanels.GiftBoxes,
          }
        )}">${GIFT_BOXES_PER_REFERRAL_ACCOUNT} gift boxes</a>.`,
      },
    }),
    db.notification.create({
      data: {
        userId: referral.userId,
        type: 'FRIEND',
        text: `Someone has used your <a href="${routes.account.referrals.path({
          bookmark: ReferralsPanels.ReferredAccounts,
        })}">referral code to sign up</a>. You have received <a href="${routes.account.path()}">${TOKENS_PER_REFERRAL_ACCOUNT} tokens</a> and <a href="${routes.account.tokens.path(
          {
            bookmark: TokensPanels.GiftBoxes,
          }
        )}">${GIFT_BOXES_PER_REFERRAL_ACCOUNT} gift boxes</a>.`,
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

  return true;
};

const notifyDiscord = async (user: User) => {
  try {
    await sendDiscordMessage({
      content: `A new user has signed up: ${user.email}`,
      webhookUrl: DISCORD_WEBHOOK_URL,
    });
  } catch (error) {
    console.warn('Failed to send discord message', error);
  }
};
