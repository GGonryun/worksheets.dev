import { TeamMemberRole } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { protectedTeamProcedure } from '../../../../procedures';

export default protectedTeamProcedure(['members:update'])
  .input(
    z.object({
      userId: z.string(),
      role: z.nativeEnum(TeamMemberRole),
    })
  )
  .mutation(async ({ ctx: { db, team, membership }, input }) => {
    const member = await db.teamMembership.findFirst({
      where: {
        teamId: team.id,
        userId: input.userId,
      },
    });

    if (!member) {
      console.error(
        'Member does not exist or does not belong to the team',
        input
      );
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Member not found',
      });
    }

    if (input.role === 'OWNER' && membership.role !== 'OWNER') {
      console.error('Only team owner can change role to OWNER', {
        membership,
        input,
      });
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'You must be an owner to transfer ownership of a team.',
      });
    }

    if (member.role === 'OWNER') {
      console.error('Cannot change role of the team owner', input);
      throw new TRPCError({
        code: 'FORBIDDEN',
        message:
          membership.role === 'OWNER'
            ? 'Ownership must be transferred before changing your role.'
            : 'You cannot change the role of an owner.',
      });
    }

    await db.teamMembership.update({
      where: {
        teamId_userId: {
          teamId: team.id,
          userId: input.userId,
        },
      },
      data: {
        role: input.role,
      },
    });
  });
