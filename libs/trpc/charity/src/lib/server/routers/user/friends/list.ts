import { TRPCError } from '@trpc/server';
import { InventoryService } from '@worksheets/services/inventory';
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
    const inventory = new InventoryService(db);
    const userId = user.id;

    const profile = await db.user.findFirst({
      where: {
        id: userId,
      },
      select: {
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

    const giftsRemaining = await inventory.quantity(
      userId,
      'small-box-of-tokens-offering'
    );

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

    return {
      code: profile.referralCode.code,
      giftsRemaining,
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
        isFavorite: follower.isFavorite,
      })),
    };
  });
