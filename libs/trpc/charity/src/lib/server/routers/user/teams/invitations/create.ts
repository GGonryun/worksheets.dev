import { TRPCError } from '@trpc/server';
import { TeamMemberRole } from '@worksheets/prisma';
import { z } from 'zod';

import { protectedTeamProcedure } from '../../../../procedures';
import { teamInviteSchema } from './shared';

export default protectedTeamProcedure(['members:create'])
  .input(
    z.object({
      email: z.string(),
      role: z.nativeEnum(TeamMemberRole),
    })
  )
  .output(teamInviteSchema)
  .mutation(async ({ ctx: { db, team, membership }, input }) => {
    const existingMembership = await db.teamMembership.findFirst({
      where: {
        teamId: team.id,
        user: {
          email: input.email,
        },
      },
    });

    if (existingMembership) {
      console.error('User is already a member of the team', input);
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'User is already a member of the team',
      });
    }

    const existingInvitation = await db.teamInvite.findFirst({
      where: {
        teamId: team.id,
        email: input.email,
      },
    });

    if (existingInvitation) {
      console.error('Invitation already exists for this email', input);
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'Invitation already exists for this email',
      });
    }

    const invite = await db.teamInvite.create({
      data: {
        teamId: team.id,
        email: input.email,
        role: input.role,
        invitedById: membership.userId,
      },
      include: {
        invitedBy: true,
        team: true,
      },
    });
    return invite;
  });
