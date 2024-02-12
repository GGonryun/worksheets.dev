import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .input(
    z.object({
      raffleId: z.number(),
    })
  )
  .output(
    z.object({
      youWon: z.boolean(),
      entries: z.number(),
    })
  )
  .query(async ({ input: { raffleId }, ctx: { db, user } }) => {
    const participation = await db.raffleParticipation.findFirst({
      where: {
        raffleId,
        userId: user.id,
      },
      select: {
        numTickets: true,
        winner: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!participation) {
      return {
        youWon: false,
        entries: 0,
      };
    }

    return {
      youWon: Boolean(participation.winner?.id),
      entries: participation.numTickets,
    };
  });
