import { z } from 'zod';

import { publicProcedure } from '../../procedures';

export default publicProcedure
  .output(
    z.object({
      id: z.string(),
    })
  )
  .query(async ({ ctx: { db } }) => {
    // get a random game
    const game = await db.game.findMany({
      select: {
        id: true,
      },
    });

    // get a random game
    const randomGame = game[Math.floor(Math.random() * game.length)];

    return {
      id: randomGame.id,
    };
  });
