import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { WonRaffleDetails } from '@worksheets/util/types';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .output(z.custom<WonRaffleDetails[]>())
  .query(async ({ ctx: { db, user } }) => {
    console.info(`finding all won prizes for user ${user.id}`);

    const userId = user.id;
    const winningTickets = await db.raffleTicket.findMany({
      where: {
        userId,
        winner: {
          isNot: null,
        },
      },
      include: {
        winner: true,
        raffle: {
          include: {
            prize: true,
          },
        },
      },
    });

    return winningTickets.map(convertTicket);
  });

const convertTicket = (
  ticket: Prisma.RaffleTicketGetPayload<{
    include: {
      winner: true;
      raffle: {
        include: {
          prize: true;
        };
      };
    };
  }>
): WonRaffleDetails => {
  if (!ticket.winner) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message:
        'Ticket is not a winner, should not have been returned from the database',
    });
  }

  return {
    raffleId: ticket.raffleId,
    prizeId: ticket.raffle.prizeId,
    ticketId: ticket.id,
    name: ticket.raffle.prize.name,
    imageUrl: ticket.raffle.prize.imageUrl,
    type: ticket.raffle.prize.type,
    expiresAt: ticket.raffle.expiresAt.getTime(),
    claimBy: ticket.winner.claimBefore.getTime(),
    claimedAt: ticket.winner.claimedAt?.getTime(),
  };
};
