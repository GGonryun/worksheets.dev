import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .input(
    z.object({
      ticketId: z.string(),
    })
  )
  .output(
    z.object({
      code: z.string(),
    })
  )
  .mutation(async ({ ctx: { user, db }, input: { ticketId } }) => {
    const ticket = await db.raffleTicket.findFirst({
      where: {
        id: ticketId,
        userId: user.id,
      },
      include: {
        winner: {
          include: {
            assignment: {
              include: {
                activationCode: true,
              },
            },
          },
        },
      },
    });

    if (!ticket) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'The ticket does not exist',
      });
    }

    if (!ticket.winner) {
      throw new TRPCError({
        code: 'PRECONDITION_FAILED',
        message: 'Ticket is not a winner',
      });
    }

    if (!ticket.winner.assignment) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Ticket has not been assigned an activation code',
      });
    }

    if (!ticket.winner.claimedAt) {
      await db.winningTicket.update({
        where: {
          id: ticket.winner.id,
        },
        data: {
          claimedAt: new Date(),
        },
      });
    }

    return {
      code: ticket.winner.assignment.activationCode.content,
    };
  });
