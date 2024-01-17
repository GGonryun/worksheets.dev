import { TRPCError } from '@trpc/server';
import { z } from '@worksheets/zod';

import { protectedProcedure } from '../../../procedures';

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
    });

    if (!friendship) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'A friendship does not exist. Add them as a friend first.',
      });
    }

    const [userRewards, friendRewards] = await Promise.all([
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

    if (userRewards.sharableGiftBoxes <= 0) {
      throw new TRPCError({
        code: 'PRECONDITION_FAILED',
        message: 'You do not have any gifts to send.',
      });
    }

    await Promise.all([
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
      db.friendship.update({
        where: {
          id,
        },
        data: {
          giftSentAt: new Date(),
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
  });
