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
      youWon: z.boolean(),
      entries: z.number(),
    })
  )
  .query(async ({ input: { prizeId }, ctx: { db, user } }) => {
    const tickets = await db.raffleTicket.findMany({
      where: {
        prizeId,
        userId: user.id,
      },
    });

    return {
      youWon: !!tickets.find((ticket) => ticket.isWinner),
      entries: tickets.length,
    };
  });
