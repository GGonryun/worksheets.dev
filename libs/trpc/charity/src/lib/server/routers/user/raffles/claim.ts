import { TRPCError } from '@trpc/server';
import { CryptographyService } from '@worksheets/services/encryption';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';

const crypto = new CryptographyService();

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
        raffle: {
          select: {
            numWinners: true,
            id: true,
          },
        },
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
        message: 'The winning ticket does not exist',
      });
    }

    if (!winner.claimedAt) {
      await db.$transaction(async (tx) => {
        await tx.raffleWinner.update({
          where: {
            id: winner.id,
          },
          data: {
            claimedAt: new Date(),
          },
        });

        // check to see if everyone has claimed the alert
        const claimedWinners = await tx.raffleWinner.count({
          where: {
            raffleId: winner.raffle.id,
            claimedAt: {
              not: null,
            },
          },
        });

        if (claimedWinners === winner.raffle.numWinners) {
          await tx.raffle.update({
            where: {
              id: winner.raffle.id,
            },
            data: {
              status: 'COMPLETE',
            },
          });
        }
        // delete any outstanding alerts
        await tx.claimAlert.deleteMany({
          where: {
            winnerId: winner.id,
          },
        });
      });
    }

    return {
      code: await crypto.decrypt(winner.code.content),
    };
  });
