import { TRPCError } from '@trpc/server';
import { User } from '@worksheets/prisma';
import { PrismaClient } from '@worksheets/prisma';
import { InventoryService } from '@worksheets/services/inventory';
import { NotificationsService } from '@worksheets/services/notifications';
import { QuestsService } from '@worksheets/services/quests';
import { capitalizeFirstLetter } from '@worksheets/util/strings';
import { waitFor } from '@worksheets/util/time';
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
    const inventory = new InventoryService(db);
    // check if user rewards object has been created.
    const exists = await db.referralCode.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (exists) {
      return false;
    }

    const MAX_ATTEMPTS = 5;

    await initializeUser(db, user.id, MAX_ATTEMPTS);
    await commitToNewsletter(db, user.email);
    await setReferralCode(db, user, input?.referralCode);
    await inventory.initializeUser(user.id);
    await notifications.send('new-user', { user });
    await notifications.send('welcome-user', { user });
    // artificial delay to ensure all resources are created
    await waitFor(1000);

    return true;
  });

const commitToNewsletter = async (db: PrismaClient, email: string) =>
  await db.newsletterSubscription.upsert({
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
  });

const initializeUser = async (
  db: PrismaClient,
  userId: string,
  attempts: number
) => {
  const username = generateSlug(3, {
    format: 'camel',
    partsOfSpeech: ['adjective', 'adjective', 'noun'],
  });
  const code = Math.random().toString(36).substring(2, 8);
  try {
    await db.$transaction([
      db.referralCode.create({
        data: {
          userId,
          code,
        },
      }),
      db.user.update({
        where: {
          id: userId,
        },
        data: {
          username: capitalizeFirstLetter(username),
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

    await initializeUser(db, userId, attempts - 1);
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
