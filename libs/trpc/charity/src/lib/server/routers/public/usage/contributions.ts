import { basicWebsiteStatisticsSchema } from '@worksheets/util/types';

import { publicProcedure } from '../../../procedures';

export default publicProcedure
  .output(basicWebsiteStatisticsSchema)
  .query(async ({ ctx: { db } }) => {
    const [
      allGames,
      gamesPlayed,
      players,
      rafflesParticipated,
      prizesDelivered,
    ] = await Promise.all([
      db.game.count(),
      db.game.aggregate({
        _sum: {
          plays: true,
        },
      }),
      db.user.count(),
      db.raffleParticipation.aggregate({
        _sum: {
          numEntries: true,
        },
      }),
      db.raffleParticipation.count({
        where: {
          winner: true,
        },
      }),
    ]);

    return {
      uniqueGames: allGames,
      uniquePlayers: players,
      totalGamePlays: gamesPlayed._sum.plays ?? 0,
      rafflesParticipated: rafflesParticipated._sum.numEntries ?? 0,
      prizesDelivered: prizesDelivered,
    };
  });
