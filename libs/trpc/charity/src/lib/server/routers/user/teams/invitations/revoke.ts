import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { protectedTeamProcedure } from '../../../../procedures';

export default protectedTeamProcedure(['members:delete'])
  .input(
    z.object({
      id: z.string(),
    })
  )
  .mutation(async ({ ctx: { db, team }, input }) => {
    const invitations = await db.teamInvite.findFirst({
      where: {
        id: input.id,
      },
    });
    if (!invitations) {
      console.error('Invitation does not exist', input);
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Invitation not found',
      });
    }

    await db.teamInvite.delete({
      where: { id: input.id },
    });

    return { success: true };
  });
