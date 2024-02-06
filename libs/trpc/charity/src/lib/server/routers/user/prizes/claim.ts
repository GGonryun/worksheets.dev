import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .input(
    z.object({
      prizeId: z.string(),
    })
  )
  .output(
    z.object({
      code: z.string(),
    })
  )
  .mutation(async ({ ctx: { user, db }, input: { prizeId } }) => {
    const ticket = await db.raffleTicket.findMany({
      where: {
        prizeId: prizeId,
        userId: user.id,
        isWinner: true,
      },
      include: {
        prize: {
          select: {
            code: true,
          },
        },
      },
    });

    if (!ticket) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'No winning ticket found',
      });
    }

    if (ticket.length > 1) {
      console.error('More than one winning ticket found');
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'More than one winning ticket found',
      });
    }

    const winningTicket = ticket[0];

    if (winningTicket.claimedAt) {
      return {
        code: winningTicket.prize.code,
      };
    }

    await db.raffleTicket.update({
      where: {
        id: winningTicket.id,
      },
      data: {
        claimedAt: new Date(),
      },
    });
    return {
      code: winningTicket.prize.code,
    };
  });
