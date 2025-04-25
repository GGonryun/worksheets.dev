import { teamSchema } from '@worksheets/util/types';

import { protectedProcedure } from '../../../procedures';
import { parseTeam } from './shared';

export default protectedProcedure
  .output(teamSchema.array())
  .query(async ({ ctx: { user, db } }) => {
    const membership = await db.teamMembership.findMany({
      where: {
        userId: user.id,
      },
      include: {
        team: {
          include: {
            members: true,
            games: true,
          },
        },
      },
    });

    if (!membership.length) {
      return [];
    }

    return membership.map(({ team }) => team).map((team) => parseTeam(team));
  });
