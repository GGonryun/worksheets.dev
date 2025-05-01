import { protectedTeamProcedure } from '../../../../procedures';
import { teamInviteSchema } from './shared';

export default protectedTeamProcedure(['members:read'])
  .output(teamInviteSchema.array())
  .query(async ({ ctx: { db, team } }) => {
    const invites = await db.teamInvite.findMany({
      where: {
        teamId: team.id,
      },
      include: {
        invitedBy: true,
        team: true,
      },
    });
    return invites;
  });
