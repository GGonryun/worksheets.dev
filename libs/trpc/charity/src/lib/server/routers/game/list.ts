import { z } from 'zod';

import { publicProcedure } from '../../procedures';

export default publicProcedure
  .output(z.string().array())
  .query(async ({ ctx: { db } }) => {
    const games = await db.game.findMany({
      select: {
        id: true,
      },
    });

    return games.map((game) => game.id);
  });
