import { basicGameInfoSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { publicProcedure } from '../../../procedures';
import { gameBasicInfoProperties } from './shared';

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
        visibility: 'PUBLIC',
      },
      select: gameBasicInfoProperties,
      orderBy: {
        plays: 'desc',
      },
    });

    const randomGames = games.sort(() => 0.5 - Math.random()).slice(0, 30);

    return randomGames.map((game) => game);
  });
