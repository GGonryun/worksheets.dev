import {
  gameMonetizeGames,
  games,
} from '@worksheets/data-access/charity-games';
import { basicWebsiteStatisticsSchema } from '@worksheets/util/types';

import { publicProcedure } from '../../procedures';

export default publicProcedure
  .output(basicWebsiteStatisticsSchema)
  .query(async ({ ctx: { db } }) => {
    // donated games exclude game monetize games
    const allGames = games.length - gameMonetizeGames.length;

    // game plays is the sum of all game plays
    const gamesPlayed = await db.gamePlay.findMany({
      select: {
        total: true,
      },
    });

    // reduce the array to a single number
    const totalGamePlays = gamesPlayed.reduce((a, gp) => {
      return a + gp.total;
    }, 0);

    return {
      donatedGames: allGames,
      totalGamePlays: totalGamePlays,
      uniqueGames: gamesPlayed.length,
      uniquePlayers: 500,
      weeklyImpressions: 10000,
    };
  });
