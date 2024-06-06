import { TRPCError } from '@trpc/server';
import { followerSchema, friendSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .output(
    z.object({
      following: friendSchema.array(),
      followers: followerSchema.array(),
    })
  )
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
        followers: {
          select: {
            id: true,
            isFavorite: true,
            user: {
              select: {
                username: true,
                referralCode: {
                  select: {
                    code: true,
                  },
                },
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

    const following = profile.friends.map((friendship) => ({
      friendshipId: friendship.id,
      username: friendship.friend.username,
      // this is the last time they played a game or performed a reward action.
      lastSeen:
        friendship.friend.lastSeen?.getTime() ??
        friendship.friend.createdAt.getTime(),
      isFavorite: friendship.isFavorite,
    }));

    const followers = profile.followers.map((follower) => ({
      friendshipId: follower.id,
      username: follower.user.username,
      friendCode: follower.user?.referralCode?.code ?? 'ERROR',
      isFriend: profile.friends.some(
        (friendship) => friendship.friend.username === follower.user.username
      ),
      isFavorite: follower.isFavorite,
    }));

    return { following, followers };
  });
