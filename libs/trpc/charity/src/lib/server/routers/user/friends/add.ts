import { TRPCError } from '@trpc/server';
import { NotificationsService } from '@worksheets/services/notifications';
import { QuestsService } from '@worksheets/services/quests';
import { MAX_FRIENDS } from '@worksheets/util/types';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';

const notifications = new NotificationsService();
const quests = new QuestsService();

export default protectedProcedure
  .input(
    z.object({
      code: z.string(), // the referral code is used as a friend code too
    })
  )
  .mutation(async ({ ctx: { db, user }, input: { code } }) => {
    const profile = await db.referralCode.findFirst({
      where: {
        code,
      },
      select: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    if (!profile) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'A user with that friend code does not exist.',
      });
    }

    const friendship = await db.friendship.findFirst({
      where: {
        userId: user.id,
        friendId: profile.user.id,
      },
    });

    if (friendship) {
      throw new TRPCError({
        code: 'PRECONDITION_FAILED',
        message: 'You are already friends with this user.',
      });
    }

    const referral = await db.referralCode.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (!referral) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'You do not have a referral code set. Contact support.',
      });
    }

    const friends = await db.friendship.count({
      where: {
        userId: user.id,
      },
    });

    if (friends >= MAX_FRIENDS) {
      throw new TRPCError({
        code: 'PRECONDITION_FAILED',
        message: `You can only have ${MAX_FRIENDS} friends.`,
      });
    }

    const friendId = profile.user.id;
    await Promise.allSettled([
      db.friendship.create({
        data: {
          userId: user.id,
          friendId,
        },
      }),
      quests.trackId({
        questId: 'ADD_FRIEND_INFINITE',
        userId: user.id,
        input: {
          userId: friendId,
        },
      }),
      notifications.send('new-follower', {
        user: profile.user,
        follower: user,
      }),
    ]);
  });
