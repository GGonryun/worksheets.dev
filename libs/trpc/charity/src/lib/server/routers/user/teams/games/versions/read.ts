import { TRPCError } from '@trpc/server';
import { gameFileSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { protectedTeamProcedure } from '../../../../../procedures';
import { parseGameFileVersion } from './shared';

export default protectedTeamProcedure
  .input(
    z.object({
      fileId: z.string(),
    })
  )
  .output(gameFileSchema)
  .query(async ({ ctx: { db, team }, input }) => {
    const { fileId } = input;
    const file = await db.gameFile.findFirst({
      where: {
        id: fileId,
        game: {
          teamId: team.id,
        },
      },
      include: {
        game: true,
        uploader: true,
      },
    });

    if (!file) {
      console.error(
        'Game version does not exist or does not belong to team',
        input
      );
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Game version not found',
      });
    }

    return parseGameFileVersion(file);
  });
