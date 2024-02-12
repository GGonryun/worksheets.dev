import { basicGameInfoSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { publicProcedure } from '../../procedures';

export default publicProcedure
  .input(
    z.object({
      gameId: z.string(),
    })
  )
  .output(z.array(basicGameInfoSchema))
  .query(async ({ ctx: { db }, input: { gameId } }) => {
    const games = await db.game.findMany({
      where: {
        id: {
          notIn: [gameId],
        },
        status: 'PUBLISHED',
      },
      select: {
        id: true,
        title: true,
        thumbnail: true,
        plays: true,
      },
      orderBy: {
        plays: 'desc',
      },
    });

    return games.map((game) => ({
      id: game.id,
      name: game.title,
      imageUrl: game.thumbnail,
      plays: game.plays,
    }));
  });
