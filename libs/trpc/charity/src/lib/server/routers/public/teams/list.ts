import { parseTeam, teamSchema } from '@worksheets/util/types';

import { publicProcedure } from '../../../procedures';

export default publicProcedure
  .output(teamSchema.array())
  .query(async ({ ctx: { db } }) => {
    const teams = await db.team.findMany({
      include: {
        members: true,
        games: true,
      },
    });

    return teams.map((team) => parseTeam(team));
  });
