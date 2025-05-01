import { TRPCError } from '@trpc/server';
import { cookies } from '@worksheets/util/cookies';

import { protectedTeamProcedure } from '../../../../procedures';

export default protectedTeamProcedure(['members:leave']).mutation(
  async ({ ctx: { membership, res, db } }) => {
    if (membership.role === 'OWNER') {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message:
          'You cannot leave the team as the owner. Please transfer ownership first or delete the team.',
      });
    }

    await db.teamMembership.delete({
      where: {
        teamId_userId: {
          teamId: membership.teamId,
          userId: membership.userId,
        },
      },
    });

    cookies.del(res).teamId();
  }
);
