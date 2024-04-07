import { TRPCError } from '@trpc/server';
import { NotificationsService } from '@worksheets/services/notifications';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';

const notifications = new NotificationsService();

export default protectedProcedure
  .input(
    z.object({
      // friend object id not a user id
      friendshipId: z.string(),
    })
  )
  .mutation(async ({ ctx: { db, user }, input: { friendshipId: id } }) => {
    const userId = user.id;
    console.info('user is sending gift to friend with id', { userId, id });

    const friendship = await db.friendship.findFirst({
      where: {
        id,
        userId, // makes sure the user owns the friendship.
      },
      select: {
        id: true,
        userId: true,
        friendId: true,
        friend: {
          select: {
            username: true,
          },
        },
      },
    });

    if (!friendship) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'A friendship does not exist. Add them as a friend first.',
      });
    }

    const [userRewards, friendRewards, gift] = await Promise.all([
      db.rewards.findFirst({
        where: {
          userId: friendship.userId,
        },
      }),
      db.rewards.findFirst({
        where: {
          userId: friendship.friendId,
        },
      }),
      db.gift.findFirst({
        where: {
          friendshipId: friendship.id,
        },
      }),
    ]);

    if (!userRewards) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Could not find user rewards. Contact support for assistance.',
      });
    }

    if (!friendRewards) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message:
          'Could not find friend rewards. Contact support for assistance.',
      });
    }

    if (gift) {
      throw new TRPCError({
        code: 'PRECONDITION_FAILED',
        message: `You've already sent a gift to ${friendship.friend.username}!`,
      });
    }

    if (userRewards.sharableGiftBoxes <= 0) {
      throw new TRPCError({
        code: 'PRECONDITION_FAILED',
        message: 'You do not have any gifts to send.',
      });
    }

    await db.$transaction([
      // user loses a sharable gift box.
      db.rewards.update({
        where: {
          id: userRewards.id,
        },
        data: {
          sharableGiftBoxes: {
            decrement: 1,
          },
          giftBoxes: {
            increment: 1,
          },
        },
      }),

      // record that the user has sent a gift to this friend today.
      db.gift.create({
        data: {
          friendshipId: friendship.id,
        },
      }),

      // friend gains a gift box.
      db.rewards.update({
        where: {
          id: friendRewards.id,
        },
        data: {
          giftBoxes: {
            increment: 1,
          },
        },
      }),
    ]);

    await notifications.send('gift-received', {
      recipient: { id: friendship.friendId },
      sender: { username: user.username },
    });
  });
