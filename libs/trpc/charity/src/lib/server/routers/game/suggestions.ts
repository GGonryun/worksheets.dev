import { detailedGameInfoSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { publicProcedure } from '../../procedures';

export default publicProcedure
  .input(
    z.object({
      gameId: z.string(),
    })
  )
  .output(z.array(detailedGameInfoSchema))
  .query(async ({ ctx: { db }, input: { gameId } }) => {
    const games = await db.game.findMany({
      select: {
        id: true,
        title: true,
        thumbnail: true,
        plays: true,
      },
    });

    // filter out the game that is being viewed
    const filteredGames = games.filter((game) => game.id !== gameId);

    return filteredGames.map((game) => ({
      id: game.id,
      name: game.title,
      image: game.thumbnail,
      plays: game.plays,
    }));
  });
