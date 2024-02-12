import { WonRaffleDetails } from '@worksheets/util/types';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .output(z.custom<WonRaffleDetails[]>())
  .query(async ({ ctx: { db, user } }) => {
    console.info(`finding all won raffles for user ${user.id}`);

    const userId = user.id;
    const winningTickets = await db.raffleWinner.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        claimedAt: true,
        raffle: {
          select: {
            id: true,
            expiresAt: true,
            prize: {
              select: {
                id: true,
                name: true,
                imageUrl: true,
                type: true,
              },
            },
          },
        },
      },
    });

    return winningTickets.map((winner) => ({
      name: winner.raffle.prize.name,
      imageUrl: winner.raffle.prize.imageUrl,
      type: winner.raffle.prize.type,
      expiresAt: winner.raffle.expiresAt.getTime(),

      winnerId: winner.id,
      raffleId: winner.raffle.id,
      prizeId: winner.raffle.prize.id,
      ticketId: winner.id,
      claimedAt: winner.claimedAt?.getTime(),
    }));
  });
