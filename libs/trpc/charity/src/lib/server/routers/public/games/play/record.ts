import { z } from 'zod';

import { publicProcedure } from '../../../../procedures';

export default publicProcedure
  .input(
    z.object({
      gameId: z.string(),
    })
  )
  .mutation(async ({ input: { gameId }, ctx: { db } }) => {
    await db.game.update({
      where: {
        id: gameId,
      },
      data: {
        plays: {
          increment: 1,
        },
      },
    });
  });
