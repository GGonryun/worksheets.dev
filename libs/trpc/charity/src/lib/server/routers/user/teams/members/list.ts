import { adminsFirst, teamMemberSchema } from '@worksheets/util/types';

import { protectedTeamProcedure } from '../../../../procedures';

export default protectedTeamProcedure(['members:read'])
  .output(teamMemberSchema.array())
  .query(async ({ ctx: { team, db } }) => {
    const membership = await db.teamMembership.findMany({
      where: {
        teamId: team.id,
      },
      include: {
        user: true,
      },
    });

    if (!membership.length) {
      return [];
    }

    return membership.sort(adminsFirst);
  });
