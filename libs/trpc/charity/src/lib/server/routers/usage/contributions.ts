import { publicProcedure } from '../../procedures';
import { basicWebsiteStatisticsSchema } from '@worksheets/util/types';
import {
  gameMonetizeGames,
  games,
} from '@worksheets/data-access/charity-games';

export default publicProcedure
  .output(basicWebsiteStatisticsSchema)
  .query(async ({ ctx: { db } }) => {
    // donated games exclude game monetize games
    const countGameMonetizeGames = gameMonetizeGames.length;
    const allGames = games.length;

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

    console.log('totalGamePlays', totalGamePlays);

    return {
      donatedGames: allGames - countGameMonetizeGames,
      totalGamePlays: totalGamePlays,
      uniqueGames: gamesPlayed.length,
      uniquePlayers: 500,
      weeklyImpressions: 10000,
    };
  });
