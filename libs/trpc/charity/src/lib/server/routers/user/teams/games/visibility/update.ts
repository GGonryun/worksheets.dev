import { GameVisibility } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { waitFor } from '@worksheets/util/time';
import { z } from 'zod';

import { protectedTeamProcedure } from '../../../../../procedures';

export default protectedTeamProcedure(['games:update', 'games:read'])
  .input(
    z.object({
      gameId: z.string(),
      visibility: z.nativeEnum(GameVisibility),
    })
  )
  .mutation(async ({ ctx: { db, team }, input }) => {
    const game = await db.game.findFirst({
      where: {
        id: input.gameId,
        teamId: team.id,
      },
    });

    if (!game) {
      console.error(
        'Game does not exist or does not belong to the team or the user is not a member of the team',
        input
      );
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Game not found',
      });
    }

    if (game.status !== 'APPROVED') {
      console.error(
        'Game visibility cannot be changed if it is not approved',
        input
      );
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'Game is not approved',
      });
    }

    await waitFor(2000);

    await db.game.update({
      where: {
        id: input.gameId,
      },
      data: {
        visibility: input.visibility,
      },
    });
  });
