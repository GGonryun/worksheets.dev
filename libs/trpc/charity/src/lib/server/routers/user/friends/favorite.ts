import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .input(
    z.object({
      // friend object id not a user id.
      friendshipId: z.string(),
    })
  )
  .output(
    z.object({
      newState: z.boolean(),
    })
  )
  .mutation(async ({ ctx: { db, user }, input: { friendshipId: id } }) => {
    const userId = user.id;
    console.log('toggling favorite friendship', { id });

    const friend = await db.friendship.findFirst({
      where: {
        id,
        userId, // makes sure the user owns the friendship.
      },
    });

    if (!friend) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'A friendship does not exist. Add them as a friend first.',
      });
    }

    const newState = !friend.isFavorite;
    await db.friendship.update({
      where: {
        id,
      },
      data: {
        isFavorite: newState,
      },
    });

    console.info('friendship favorite toggled', {
      id,
      isFavorite: newState,
    });

    return { newState };
  });
