import { User } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { PrismaClient } from '@worksheets/prisma';
import { NotificationsService } from '@worksheets/services/notifications';
import { QuestsService } from '@worksheets/services/quests';
import {
  MAX_DAILY_GIFT_BOX_SHARES,
  STARTING_GIFT_BOXES,
  STARTING_TOKENS,
} from '@worksheets/util/settings';
import { capitalizeFirstLetter } from '@worksheets/util/strings';
import { generateSlug } from 'random-word-slugs';
import { z } from 'zod';

import { protectedProcedure } from '../../procedures';

const notifications = new NotificationsService();
const quests = new QuestsService();

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
    await notifications.send('new-user', { user });

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
      db.newsletterSubscription.upsert({
        where: {
          email,
        },
        create: {
          email,
          confirmed: true,
        },
        update: {
          confirmed: true,
        },
      }),
      db.rewards.create({
        data: {
          userId: id,
          giftBoxes: STARTING_GIFT_BOXES,
          totalTokens: STARTING_TOKENS,
          sharableGiftBoxes: MAX_DAILY_GIFT_BOX_SHARES,
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
    ]);
    await notifications.send('welcome-user', { user });
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

  await Promise.allSettled([
    db.user.update({
      where: {
        id: userId,
      },
      data: {
        referredByUserId: referral.userId,
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
    quests.trackId({
      userId: referral.userId,
      questId: 'ADD_REFERRAL_INFINITE',
      input: {
        userId,
      },
    }),
    quests.trackId({
      userId,
      questId: 'ADD_FRIEND_INFINITE',
      input: {
        userId: referral.userId,
      },
    }),
    quests.trackId({
      userId: referral.userId,
      questId: 'ADD_FRIEND_INFINITE',
      input: {
        userId: userId,
      },
    }),
    notifications.send('new-referral', { user: { id: referral.userId } }),
  ]);

  return true;
};
