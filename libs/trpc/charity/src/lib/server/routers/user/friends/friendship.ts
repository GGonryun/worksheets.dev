import { TRPCError } from '@trpc/server';
import { friendSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .input(
    z.object({
      friendId: z.string(),
    })
  )
  .output(
    friendSchema
      .pick({
        friendshipId: true,
        isFavorite: true,
      })
      .nullable()
  )
  .query(async ({ ctx: { db, user }, input: { friendId } }) => {
    const userId = user.id;
    if (userId === friendId) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: "You can't be friends with yourself",
        cause: { friendId, userId },
      });
    }

    const friendship = await db.friendship.findFirst({
      where: {
        userId,
        friendId,
      },
    });

    return friendship
      ? {
          friendshipId: friendship.id,
          isFavorite: friendship.isFavorite,
        }
      : null;
  });
