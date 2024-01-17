import { TRPCError } from '@trpc/server';
import { z } from '@worksheets/zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .input(
    z.object({
      code: z.string(), // username for now.
    })
  )
  .output(
    z.object({
      exists: z.boolean(),
    })
  )
  .mutation(async ({ ctx: { db, user }, input: { code: username } }) => {
    console.info('checking if username exists', { username });

    if (user.username === username) {
      throw new TRPCError({
        code: 'PRECONDITION_FAILED',
        message: 'Cannot add yourself as a friend.',
      });
    }

    // search for a user with the given username.
    const searchingFor = await db.user.findFirst({
      where: {
        username,
      },
    });

    if (!searchingFor) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'A user with that username does not exist.',
      });
    }

    return {
      exists: true,
    };
  });
