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
      tokensAccumulated,
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
          numTickets: true,
        },
      }),
      db.rewards.aggregate({
        _sum: {
          totalTokens: true,
        },
      }),
      db.raffleWinner.count(),
    ]);

    return {
      uniqueGames: allGames,
      uniquePlayers: players,
      totalGamePlays: gamesPlayed._sum.plays ?? 0,
      rafflesParticipated: rafflesParticipated._sum.numTickets ?? 0,
      tokensAccumulated: tokensAccumulated._sum.totalTokens ?? 0,
      prizesDelivered: prizesDelivered,
    };
  });
