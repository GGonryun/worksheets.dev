import { TRPCError } from '@trpc/server';
import { MAX_BEST_FRIENDS } from '@worksheets/util/types';
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

    // find all best friends.
    const bestFriends = await db.friendship.count({
      where: {
        userId,
        isFavorite: true,
      },
    });

    const newState = !friend.isFavorite;
    // throw err if you're trying to favorite a friend and you already have the max number of best friends.
    if (newState && bestFriends >= MAX_BEST_FRIENDS) {
      throw new TRPCError({
        code: 'PRECONDITION_FAILED',
        message: `You can only have ${MAX_BEST_FRIENDS} best friends.`,
      });
    }

    await db.friendship.update({
      where: {
        id,
      },
      data: {
        isFavorite: newState,
      },
    });

    return { newState };
  });
