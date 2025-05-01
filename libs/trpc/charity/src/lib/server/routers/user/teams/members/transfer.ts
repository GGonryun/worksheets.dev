import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { protectedTeamProcedure } from '../../../../procedures';

export default protectedTeamProcedure(['ownership:update'])
  .input(
    z.object({
      userId: z.string(),
    })
  )
  .mutation(async ({ ctx: { db, team, membership }, input }) => {
    const newOwner = await db.teamMembership.findFirst({
      where: {
        teamId: team.id,
        userId: input.userId,
      },
    });

    if (!newOwner) {
      console.error(
        'Member does not exist or does not belong to the team',
        input
      );
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Member not found',
      });
    }

    if (newOwner.role === 'OWNER') {
      console.error('new owner is already an owner', input);
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'The user is already an owner.',
      });
    }

    await db.$transaction([
      db.teamMembership.update({
        where: {
          teamId_userId: {
            teamId: team.id,
            userId: input.userId,
          },
        },
        data: {
          role: 'OWNER',
        },
      }),
      db.teamMembership.update({
        where: {
          teamId_userId: {
            teamId: team.id,
            userId: membership.userId,
          },
        },
        data: {
          role: 'MANAGER',
        },
      }),
    ]);
  });
