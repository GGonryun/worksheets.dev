import { TRPCError } from '@trpc/server';
import { z } from '@worksheets/zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .input(
    z.object({
      username: z.string(),
      bio: z.string().nullable(),
    })
  )
  .output(
    z.union([
      z.object({
        okay: z.literal(true),
      }),
      z.object({
        okay: z.literal(false),
        errors: z
          .object({
            username: z.string(),
            bio: z.string(),
          })
          .partial(),
      }),
    ])
  )
  .mutation(async ({ ctx: { user, db }, input: { username, bio } }) => {
    const id = user.id;

    // check if username is taken.
    const usernameTaken = await db.user.findFirst({
      where: {
        username,
      },
    });

    if (usernameTaken) {
      return {
        okay: false,
        errors: {
          username: 'Username is taken',
        },
      };
    }

    try {
      await db.user.update({
        where: {
          id,
        },
        data: {
          username,
          bio,
        },
      });
    } catch (error) {
      console.error(`Failed to update user profile`, error);

      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Failed to update user profile: ${error}`,
      });
    }

    return {
      okay: true,
    };
  });
