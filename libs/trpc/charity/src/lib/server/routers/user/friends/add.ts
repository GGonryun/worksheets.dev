import { TRPCError } from '@trpc/server';
import { z } from '@worksheets/zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .input(
    z.object({
      // TODO: for now we're using the username as the code
      code: z.string(),
    })
  )
  .mutation(async ({ ctx: { db, user }, input: { code: username } }) => {
    console.info('user is adding friend with code', { username });

    const friendUser = await db.user.findFirst({
      where: {
        username,
      },
    });

    if (!friendUser) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'A user with that username does not exist.',
      });
    }

    const friendship = await db.friendship.findFirst({
      where: {
        userId: user.id,
        friendId: friendUser.id,
      },
    });

    if (friendship) {
      throw new TRPCError({
        code: 'PRECONDITION_FAILED',
        message: 'You are already friends with this user.',
      });
    }

    await db.friendship.create({
      data: {
        userId: user.id,
        friendId: friendUser.id,
      },
    });
  });
