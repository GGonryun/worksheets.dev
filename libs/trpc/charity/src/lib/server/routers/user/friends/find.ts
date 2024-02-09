import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .input(
    z.object({
      code: z.string(), // referral code
    })
  )
  .output(
    z.object({
      exists: z.boolean(),
      username: z.string(),
    })
  )
  .mutation(async ({ ctx: { db, user }, input: { code } }) => {
    console.info('checking if username exists', { referralCode: code });

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

    if (user.id === profile?.user.id) {
      throw new TRPCError({
        code: 'PRECONDITION_FAILED',
        message: 'Cannot add yourself as a friend.',
      });
    }

    return {
      exists: true,
      username: profile.user.username,
    };
  });
