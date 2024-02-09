import { TRPCError } from '@trpc/server';
import { friendSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .output(
    z.object({
      list: z.array(friendSchema),
      giftsRemaining: z.number(),
      code: z.string().optional(), // code is the username for now.
    })
  )
  .query(async ({ ctx: { db, user } }) => {
    const userId = user.id;
    console.info('finding user friendships', { userId });

    const friendships = await db.friendship.findMany({
      where: {
        userId,
      },
      include: {
        friend: {
          select: {
            lastSeen: true,
            username: true,
            createdAt: true,
          },
        },
      },
    });

    const rewards = await db.rewards.findFirst({
      where: {
        userId,
      },
    });

    if (!rewards) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Could not find user rewards. Contact support for assistance.',
      });
    }

    return {
      code: user.username,
      giftsRemaining: rewards.sharableGiftBoxes,
      list: friendships.map((friendship) => ({
        id: friendship.id,
        username: friendship.friend.username,
        // this is the last time they played a game or performed a reward action.
        lastSeen:
          friendship.friend.lastSeen?.getTime() ??
          friendship.friend.createdAt.getTime(),
        isFavorite: friendship.isFavorite,
        giftSentAt: friendship.giftSentAt?.getTime() ?? null,
      })),
    };
  });
