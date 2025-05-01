import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { protectedProcedure } from '../../../../procedures';

export default protectedProcedure
  .input(
    z.object({
      teamId: z.string(),
    })
  )
  .mutation(async ({ ctx: { db, user }, input }) => {
    const invitation = await db.teamInvite.findFirst({
      where: {
        teamId: input.teamId,
        email: user.email,
      },
    });

    if (!invitation) {
      console.error(
        'Invitation does not exist or does not belong to the team or the user is not a member of the team',
        input
      );
      throw new TRPCError({
        code: 'NOT_FOUND',
        message:
          'Invitation does not exist. Please check with the team owner or manager.',
      });
    }

    await db.$transaction([
      db.teamMembership.create({
        data: {
          teamId: invitation.teamId,
          userId: user.id,
          role: invitation.role,
        },
      }),
      db.teamInvite.delete({
        where: {
          id: invitation.id,
        },
      }),
    ]);

    return { success: true };
  });
