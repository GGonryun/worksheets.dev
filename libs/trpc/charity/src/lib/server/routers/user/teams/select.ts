import { TRPCError } from '@trpc/server';
import { cookies } from '@worksheets/util/cookies';
import { z } from 'zod';

import { protectedApiProcedure } from '../../../procedures';

export default protectedApiProcedure
  .input(z.string())
  .mutation(async ({ ctx: { db, user, res }, input: teamId }) => {
    const team = await db.team.findFirst({
      where: {
        id: teamId,
        members: {
          some: {
            userId: user.id,
          },
        },
      },
      select: {
        members: {
          select: {
            userId: true,
          },
        },
      },
    });

    if (!team) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Team not found',
      });
    }

    cookies.set(res).teamId(teamId);
  });
