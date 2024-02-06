import { Prisma } from '@prisma/client';
import { WonPrizeDetails } from '@worksheets/util/types';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .output(z.custom<WonPrizeDetails[]>())
  .query(async ({ ctx: { db, user } }) => {
    console.info(`finding all won prizes for user ${user.id}`);
    const userId = user.id;
    const winningTickets = await db.raffleTicket.findMany({
      where: {
        userId,
        isWinner: true,
      },
      include: {
        prize: {
          include: {
            sponsor: true,
          },
        },
      },
      distinct: ['prizeId'],
    });

    return winningTickets.map(convertTicket);
  });

const convertTicket = (
  ticket: Prisma.RaffleTicketGetPayload<{
    include: { prize: { include: { sponsor: true } } };
  }>
): WonPrizeDetails => {
  if (!ticket.claimBefore) {
    console.warn(
      `Ticket ${ticket.id} has no claimBefore date using default of 3 days from raffle expiration`
    );
  }
  return {
    id: ticket.prize.id,
    name: ticket.prize.name,
    imageUrl: ticket.prize.imageUrl,
    type: ticket.prize.type,
    expiresAt: ticket.prize.expiresAt.getTime(),
    claimBy:
      ticket.claimBefore?.getTime() ??
      ticket.prize.expiresAt.getTime() + THREE_DAYS_MILLISECONDS,
    claimedAt: ticket.claimedAt?.getTime(),
  };
};

const THREE_DAYS_MILLISECONDS = 3 * 24 * 60 * 60 * 1000;
