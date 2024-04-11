import { TRPCError } from '@trpc/server';
import { PrizeType } from '@worksheets/prisma';
import { RedemptionService } from '@worksheets/services/redemption';
import { assertNever } from '@worksheets/util/errors';
import { raffleClaimSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .input(
    z.object({
      winnerId: z.string(),
    })
  )
  .output(raffleClaimSchema)
  .mutation(async ({ ctx: { user, db }, input: { winnerId } }) => {
    const redemptionService = new RedemptionService(db);
    // TODO: add support for encrypted codes.
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
        prize: {
          select: {
            id: true,
            type: true,
          },
        },
        code: {
          select: {
            id: true,
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

        // update the activation code's access time
        await tx.activationCode.update({
          where: {
            id: winner.code.id,
          },
          data: {
            accessedAt: new Date(),
          },
        });

        // if the activation code is a redemption code, automatically mark it
        // as redeemed and update the user's inventory.
        if (redemptionService.redeemable(winner.prize.type)) {
          const decryptedCode = winner.code.content;

          // ignore errors if the redemption code has already been redeemed
          await redemptionService.redeem({
            userId: user.id,
            code: decryptedCode,
          });
        }
      });
    }

    switch (winner.prize.type) {
      case PrizeType.LOOT:
        return {
          type: PrizeType.LOOT,
        };
      case PrizeType.STEAM_KEY:
        return {
          type: PrizeType.STEAM_KEY,
          code: winner.code.content,
        };

      default:
        throw assertNever(winner.prize.type);
    }
  });
