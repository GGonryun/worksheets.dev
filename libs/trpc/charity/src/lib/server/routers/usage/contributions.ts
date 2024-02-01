import { basicWebsiteStatisticsSchema } from '@worksheets/util/types';

import { publicProcedure } from '../../procedures';

export default publicProcedure
  .output(basicWebsiteStatisticsSchema)
  .query(async ({ ctx: { db } }) => {
    // donated games exclude game monetize games
    const [allGames, gamesPlayed] = await Promise.all([
      db.game.count({
        where: {
          developerId: {
            not: 'gamemonetize',
          },
        },
      }),
      db.game.findMany({
        select: {
          plays: true,
        },
      }),
    ]);

    // reduce the array to a single number
    const totalGamePlays = gamesPlayed.reduce((a, gp) => {
      return a + gp.plays;
    }, 0);

    return {
      donatedGames: allGames,
      totalGamePlays: totalGamePlays,
      uniqueGames: gamesPlayed.length,
      uniquePlayers: 500,
      weeklyImpressions: 10000,
    };
  });
