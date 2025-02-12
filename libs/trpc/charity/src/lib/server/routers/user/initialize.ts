import { TRPCError } from '@trpc/server';
import { User } from '@worksheets/prisma';
import { PrismaClient } from '@worksheets/prisma';
import { FriendshipService } from '@worksheets/services/friendship';
import { InventoryService } from '@worksheets/services/inventory';
import { NotificationsService } from '@worksheets/services/notifications';
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
    const notifications = new NotificationsService(db);
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
    await setReferralCode(db, user, input?.referralCode);
    await commitToNewsletter(db, user.email);
    await inventory.initializeUser(user.id);
    await notifications.send('new-user', { user });
    await notifications.send('welcome-user', { user });

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

  const notifications = new NotificationsService(db);
  const friends = new FriendshipService(db);

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
    friends.link(userId, referral.userId),

    notifications.send('new-referral', { user: { id: referral.userId } }),
  ]);

  return true;
};
