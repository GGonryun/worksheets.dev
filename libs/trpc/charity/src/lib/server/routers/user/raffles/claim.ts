import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .input(
    z.object({
      winnerId: z.string(),
    })
  )
  .output(
    z.object({
      code: z.string(),
    })
  )
  .mutation(async ({ ctx: { user, db }, input: { winnerId } }) => {
    const winner = await db.raffleWinner.findFirst({
      where: {
        id: winnerId,
        userId: user.id,
      },
      select: {
        id: true,
        claimedAt: true,
        code: {
          select: {
            content: true,
          },
        },
      },
    });

    if (!winner) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'The ticket does not exist',
      });
    }

    if (!winner.claimedAt) {
      await db.raffleWinner.update({
        where: {
          id: winner.id,
        },
        data: {
          claimedAt: new Date(),
        },
      });
      // delete any outstanding alerts
      await db.claimAlert.deleteMany({
        where: {
          winnerId: winner.id,
        },
      });
    }

    return {
      code: winner.code.content,
    };
  });
