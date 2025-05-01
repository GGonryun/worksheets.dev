import { z } from 'zod';

import { protectedTeamProcedure } from '../../../../procedures';
import { parseTeamGame, teamOwnedGameSchema } from './shared';

export default protectedTeamProcedure(['games:read'])
  .output(z.array(teamOwnedGameSchema))
  .query(async ({ ctx: { db, team } }) => {
    const games = await db.game.findMany({
      where: {
        teamId: team.id,
      },
    });

    return games.map(parseTeamGame);
  });
