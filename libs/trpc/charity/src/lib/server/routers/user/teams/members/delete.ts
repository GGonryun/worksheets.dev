import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { protectedTeamProcedure } from '../../../../procedures';

export default protectedTeamProcedure(['members:delete'])
  .input(
    z.object({
      userId: z.string(),
    })
  )

  .mutation(async ({ ctx: { db, team }, input }) => {
    const members = await db.teamMembership.findMany({
      where: {
        teamId: team.id,
      },
    });

    const memberToRemove = members.find(
      (member) => member.userId === input.userId
    );

    if (!memberToRemove) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Member not found',
      });
    }

    if (memberToRemove.role === 'OWNER') {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Cannot remove the owner of the team',
      });
    }
    await db.teamMembership.delete({
      where: {
        teamId_userId: {
          teamId: team.id,
          userId: input.userId,
        },
      },
    });
  });
