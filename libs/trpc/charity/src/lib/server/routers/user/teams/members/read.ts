import { TRPCError } from '@trpc/server';
import { teamMemberSchema } from '@worksheets/util/types';

import { protectedTeamProcedure } from '../../../../procedures';

export default protectedTeamProcedure(['members:read'])
  .output(teamMemberSchema)
  .query(async ({ ctx: { db, team, user } }) => {
    const where = {
      teamId: team.id,
      userId: user.id,
    };
    const membership = await db.teamMembership.findFirst({
      where,
      include: {
        user: true,
      },
    });

    if (!membership) {
      console.error(
        'Membership does not exist or does not belong to the team or the user is not a member of the team',
        where
      );
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Membership not found',
      });
    }

    return membership;
  });
