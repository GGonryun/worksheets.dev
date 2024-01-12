import {
  games,
  popularityStatisticsTemplate,
} from '@worksheets/data-access/charity-games';
import { gamePopularityStatisticsSchema } from '@worksheets/util/types';

import { publicProcedure } from '../../procedures';

export default publicProcedure
  .output(gamePopularityStatisticsSchema)
  .query(async ({ ctx: { db } }) => {
    const uniqueGames = await db.gamePlay.count();
    const gamePlayStatistics = await db.gamePlay.findMany({
      take: 10,
      orderBy: {
        total: 'desc',
      },
      select: {
        total: true,
        gameId: true,
      },
    });

    const gameStats = gamePlayStatistics.map((gps) => {
      const game = games.find((g) => (g.id === gps.gameId ? true : false));

      if (!game) {
        throw new Error(`game ${gps.gameId} not found`);
      }

      return {
        id: game.id,
        name: game.name,
        plays: gps.total,
      };
    });

    console.info(`found game stats for ${gameStats.length} games`);

    return {
      ...popularityStatisticsTemplate,
      games: gameStats,
      uniqueGames,
    };
  });
