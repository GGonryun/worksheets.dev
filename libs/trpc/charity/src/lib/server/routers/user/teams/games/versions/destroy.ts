import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { protectedTeamProcedure } from '../../../../../procedures';

export default protectedTeamProcedure(['games:update', 'games:read'])
  .input(
    z.object({
      gameId: z.string(),
      fileId: z.string(),
    })
  )
  .output(
    z.object({
      version: z.string(),
    })
  )
  .mutation(async ({ ctx: { db, team }, input }) => {
    const game = await db.game.findFirst({
      where: {
        id: input.gameId,
        teamId: team.id,
      },
      include: {
        files: true,
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
    const version = await db.gameFile.findFirst({
      where: {
        gameId: input.gameId,
        id: input.fileId,
      },
    });
    if (!version) {
      console.error('Game version does not exist', input);
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Game version not found',
      });
    }
    if (version.isCurrent) {
      console.error('Cannot delete current version', input);
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'Cannot delete current version',
      });
    }

    await db.gameFile.delete({
      where: {
        id: version.id,
      },
    });
    return version;
  });
