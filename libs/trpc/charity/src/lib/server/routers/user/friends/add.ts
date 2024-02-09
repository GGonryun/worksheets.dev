import { TRPCError } from '@trpc/server';
import { FriendsPanels } from '@worksheets/util/enums';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .input(
    z.object({
      code: z.string(), // the referral code is used as a friend code too
    })
  )
  .mutation(async ({ ctx: { db, user }, input: { code } }) => {
    console.info('user is adding friend with code', { referralCode: code });

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

    await db.friendship.create({
      data: {
        userId: user.id,
        friendId: profile.user.id,
      },
    });

    await db.notification.create({
      data: {
        userId: profile.user.id,
        type: 'FRIEND',
        text: `<b>${user.username}</b> has started <a href="/account/friends#${FriendsPanels.FriendsList}">following you</a>!`,
      },
    });
  });
