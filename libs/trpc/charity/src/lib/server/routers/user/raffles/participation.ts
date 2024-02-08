import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .input(
    z.object({
      raffleId: z.string(),
    })
  )
  .output(
    z.object({
      youWon: z.boolean(),
      entries: z.number(),
    })
  )
  .query(async ({ input: { raffleId }, ctx: { db, user } }) => {
    const tickets = await db.raffleTicket.findMany({
      where: {
        raffleId,
        userId: user.id,
      },
      include: {
        winner: true,
      },
    });

    const winningTicket = tickets.find((ticket) => ticket.winner != null);

    return {
      youWon: Boolean(winningTicket),
      entries: tickets.length,
    };
  });
