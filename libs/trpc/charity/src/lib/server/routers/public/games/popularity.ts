import { z } from 'zod';

import { publicProcedure } from '../../../procedures';
import { t } from '../../../trpc';

export default t.router({
  players: publicProcedure
    .input(
      z.object({
        gameId: z.string(),
      })
    )
    .output(z.number())
    .query(async ({ ctx: { db }, input }) => {
      return await db.gamePlayHistory.count({
        where: {
          gameId: input.gameId,
        },
      });
    }),
});
