import { InventoryService } from '@worksheets/services/inventory';
import { basicWebsiteStatisticsSchema } from '@worksheets/util/types';

import { publicProcedure } from '../../../procedures';

export default publicProcedure
  .output(basicWebsiteStatisticsSchema)
  .query(async ({ ctx: { db } }) => {
    const inventory = new InventoryService(db);
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
          numEntries: true,
        },
      }),
      inventory.globalTokenCount(),
      db.raffleWinner.count(),
    ]);

    return {
      uniqueGames: allGames,
      uniquePlayers: players,
      totalGamePlays: gamesPlayed._sum.plays ?? 0,
      rafflesParticipated: rafflesParticipated._sum.numEntries ?? 0,
      tokensAccumulated: tokensAccumulated,
      prizesDelivered: prizesDelivered,
    };
  });
