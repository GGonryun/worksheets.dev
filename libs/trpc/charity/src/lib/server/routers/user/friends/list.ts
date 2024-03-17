import { TRPCError } from '@trpc/server';
import { followerSchema, friendSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .output(
    z.object({
      friends: z.array(friendSchema),
      followers: z.array(followerSchema),
      giftsRemaining: z.number(),
      code: z.string(), // equal to the referral code
    })
  )
  .query(async ({ ctx: { db, user } }) => {
    const userId = user.id;

    console.info('finding user friendships', { userId });

    const profile = await db.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        rewards: {
          select: {
            sharableGiftBoxes: true,
          },
        },
        referralCode: {
          select: {
            code: true,
          },
        },
        friends: {
          select: {
            id: true,
            isFavorite: true,
            gift: {
              select: {
                sentAt: true,
              },
            },
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

    if (!profile.referralCode) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message:
          'Could not find user referral code. Contact support for assistance.',
      });
    }

    if (!profile.rewards) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Could not find user rewards. Contact support for assistance.',
      });
    }

    return {
      code: profile.referralCode.code,
      giftsRemaining: profile.rewards.sharableGiftBoxes,
      friends: profile.friends.map((friendship) => ({
        friendshipId: friendship.id,
        username: friendship.friend.username,
        // this is the last time they played a game or performed a reward action.
        lastSeen:
          friendship.friend.lastSeen?.getTime() ??
          friendship.friend.createdAt.getTime(),
        isFavorite: friendship.isFavorite,
        giftSentAt: friendship.gift?.sentAt.getTime() ?? null,
      })),
      followers: profile.followers.map((follower) => ({
        friendshipId: follower.id,
        username: follower.user.username,
        friendCode: follower.user?.referralCode?.code ?? 'ERROR',
        isFriend: profile.friends.some(
          (friendship) => friendship.friend.username === follower.user.username
        ),
      })),
    };
  });
