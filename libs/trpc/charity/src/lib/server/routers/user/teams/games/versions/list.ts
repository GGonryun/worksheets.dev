import { TRPCError } from '@trpc/server';
import { gameFileMetadataSchema, gameFileSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { protectedTeamProcedure } from '../../../../../procedures';
import { parseGameFileVersion } from './shared';

export default protectedTeamProcedure(['games:read'])
  .input(
    z.object({
      gameId: z.string(),
    })
  )
  .output(gameFileSchema.array())
  .query(async ({ ctx: { db, team }, input }) => {
    const { gameId } = input;
    const files = await db.gameFile.findMany({
      where: {
        game: {
          id: gameId,
          teamId: team.id,
        },
      },
      include: {
        uploader: true,
      },
    });

    return files
      .sort((b, a) => a.version.localeCompare(b.version))
      .map((file) => {
        const metadata = gameFileMetadataSchema.safeParse(file.metadata);
        if (!metadata.success) {
          console.error('Invalid metadata', metadata.error);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Invalid file metadata',
          });
        }

        return parseGameFileVersion(file);
      });
  });
