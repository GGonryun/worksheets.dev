import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { protectedProcedure } from '../../../../procedures';
import { teamInviteSchema } from './shared';

export default protectedProcedure
  .input(
    z.object({
      slug: z.string(),
    })
  )
  .output(teamInviteSchema)
  .query(async ({ ctx: { db, user }, input }) => {
    const team = await db.team.findFirst({
      where: {
        slug: input.slug,
      },
    });
    if (!team) {
      console.error('Team does not exist', input);
      throw new TRPCError({
        code: 'NOT_FOUND',
        message:
          'This team does not exist. Double check your invitation link or contact the team owner.',
      });
    }
    const invite = await db.teamInvite.findFirst({
      where: {
        team: {
          slug: input.slug,
        },
        email: user.email,
      },
      include: {
        invitedBy: true,
        team: true,
      },
    });
    if (!invite) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message:
          'An invitation does not exist for this team. Please contact the team owner.',
      });
    }
    return invite;
  });
