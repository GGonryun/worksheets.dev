import { protectedProcedure } from '../../../procedures';
import { parseTeam, teamSchema } from './shared';

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
            logo: true,
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
