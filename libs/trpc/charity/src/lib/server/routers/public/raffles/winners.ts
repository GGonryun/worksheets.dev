import { winnerSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { publicProcedure } from '../../../procedures';

export default publicProcedure
  .input(
    z.object({
      raffleId: z.number(),
    })
  )
  .output(winnerSchema.array())
  .query(async ({ ctx: { db }, input: { raffleId } }) => {
    const winners = await db.raffleWinner.findMany({
      where: {
        raffleId,
      },
      select: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    return winners.map((w) => ({
      userId: w.user.id,
      username: w.user.username,
    }));
  });
