import { followerSchema } from '@worksheets/util/types';

import { protectedProcedure } from '../../procedures';
import { t } from '../../trpc';

export default t.router({
  list: protectedProcedure
    .output(followerSchema.array())
    .query(async ({ ctx: { db, user } }) => {
      const profile = await db.user.findFirst({
        where: {
          id: user.id,
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

      return (
        profile?.followers.map((follower) => ({
          friendshipId: follower.id,
          username: follower.user.username,
          friendCode: follower.user?.referralCode?.code ?? 'ERROR',
          isFriend: profile.friends.some(
            (friendship) =>
              friendship.friend.username === follower.user.username
          ),
          isFavorite: follower.isFavorite,
        })) ?? []
      );
    }),
});
