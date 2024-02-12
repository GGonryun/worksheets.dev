import { TRPCError } from '@trpc/server';
import { userDetails, userSummary } from '@worksheets/util/types';
import { z } from 'zod';

import { adminProcedure } from '../../procedures';
import { t } from '../../trpc';

export default t.router({
  find: adminProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .output(userDetails)
    .query(async ({ input: { userId }, ctx: { db } }) => {
      const user = await db.user.findFirst({
        where: {
          id: userId,
        },
        select: {
          id: true,
          email: true,
          username: true,
          referredByUserId: true,
          isPublisher: true,
          createdAt: true,
          type: true,
          referralCode: {
            select: {
              code: true,
            },
          },
          rewards: {
            select: {
              totalTokens: true,
              giftBoxes: true,
              updatedAt: true,
            },
          },
          referred: {
            select: {
              id: true,
            },
          },
          friends: {
            select: {
              friendId: true,
            },
          },
          followers: {
            select: {
              userId: true,
            },
          },
          notifications: {
            select: {
              id: true,
            },
          },
          submissions: {
            select: {
              id: true,
            },
          },
          participation: {
            select: {
              raffleId: true,
              numTickets: true,
            },
          },
          winnings: {
            select: {
              id: true,
            },
          },
        },
      });

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found',
        });
      }

      if (!user.rewards) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User rewards not found',
        });
      }

      return {
        userId: user.id,
        email: user.email,
        type: user.type,
        referrerId: user.referredByUserId,
        username: user.username,
        isPublisher: user.isPublisher,
        referralCode: user.referralCode?.code ?? 'ERROR',
        notifications: user.notifications.length,
        createdAt: user.createdAt.getTime(),
        rewards: {
          totalTokens: user.rewards.totalTokens,
          giftBoxes: user.rewards.giftBoxes,
          updatedAt: user.rewards.updatedAt.getTime(),
        },
        submissions: user.submissions.map((submission) => ({
          submissionId: submission.id,
        })),
        referrals: user.referred.map((referral) => ({
          userId: referral.id,
        })),
        friends: user.friends.map((friend) => ({
          userId: friend.friendId,
        })),
        followers: user.followers.map((follower) => ({
          userId: follower.userId,
        })),
        participation: user.participation.map((participation) => ({
          raffleId: participation.raffleId,
          numTickets: participation.numTickets,
        })),
        winnings: user.winnings.map((winning) => ({
          winnerId: winning.id,
        })),
      };
    }),
  list: adminProcedure
    .input(
      z.object({
        take: z.number(),
        skip: z.number(),
      })
    )
    .output(z.array(userSummary))
    .query(async ({ input: { take, skip }, ctx: { db } }) => {
      const users = await db.user.findMany({
        take,
        skip,
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          email: true,
          username: true,
          createdAt: true,
          type: true,
        },
      });

      return users.map((user) => {
        return {
          userId: user.id,
          email: user.email,
          username: user.username,
          createdAt: user.createdAt.getTime(),
          type: user.type,
        };
      });
    }),
});
