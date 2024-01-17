import { TRPCError } from '@trpc/server';
import { z } from '@worksheets/zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .input(
    z.object({
      // id of the friend object, not a user id.
      friendshipId: z.string(),
    })
  )
  .output(
    z.object({
      okay: z.boolean(),
    })
  )
  .mutation(async ({ ctx: { db, user }, input: { friendshipId: id } }) => {
    const userId = user.id;
    console.info('removing friend', { userId, id });

    const friendship = await db.friendship.findFirst({
      where: {
        id,
        userId, // makes sure the user owns the friendship.
      },
    });

    if (!friendship) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Could not find a friendship between users.',
      });
    }

    if (friendship.isFavorite) {
      throw new TRPCError({
        code: 'PRECONDITION_FAILED',
        message: 'Cannot remove a best friend.',
      });
    }

    await db.friendship.delete({
      where: {
        id: friendship.id,
      },
    });

    console.info(`friendship destroyed`, { userId, id });

    return {
      okay: true,
    };
  });
