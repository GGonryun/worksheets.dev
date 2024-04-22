import { TRPCError } from '@trpc/server';
import { friendSchema } from '@worksheets/util/types';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .output(friendSchema.array())
  .query(async ({ ctx: { db, user } }) => {
    const userId = user.id;

    const profile = await db.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        friends: {
          select: {
            id: true,
            isFavorite: true,
            friend: {
              select: {
                lastSeen: true,
                username: true,
                createdAt: true,
              },
            },
          },
        },
      },
    });

    if (!profile) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Could not find user profile. Contact support for assistance.',
      });
    }

    return profile.friends.map((friendship) => ({
      friendshipId: friendship.id,
      username: friendship.friend.username,
      // this is the last time they played a game or performed a reward action.
      lastSeen:
        friendship.friend.lastSeen?.getTime() ??
        friendship.friend.createdAt.getTime(),
      isFavorite: friendship.isFavorite,
    }));
  });
