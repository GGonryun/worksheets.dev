import { ProjectType } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { MAX_GAME_FILE_SIZE } from '@worksheets/util/settings';
import { protectedIds } from '@worksheets/util/team';
import { createGameFormSchema } from '@worksheets/util/types';
import { computeViewportId } from '@worksheets/util/viewport';
import { z } from 'zod';

import { protectedTeamProcedure } from '../../../../procedures';

export default protectedTeamProcedure(['games:create'])
  .input(createGameFormSchema)
  .output(z.any())
  .mutation(
    async ({
      ctx: { db, team },
      input: {
        title,
        id,
        description,
        tags,
        thumbnail,
        coverImage,
        aiDisclosure,
        orientation,
        version,
        gameFile,
        preview,
        notes,
        devices,
      },
    }) => {
      const game = await db.game.findFirst({
        where: {
          id,
        },
      });
      if (game) {
        console.error('Game with this id already exists', { id });
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'Game with this id already exists',
        });
      }

      const count = await db.game.count({
        where: {
          teamId: team.id,
        },
      });

      if (count >= MAX_GAME_FILE_SIZE) {
        console.error('Team has reached the maximum number of games', team.id);
        throw new TRPCError({
          code: 'FORBIDDEN',
          message:
            'Team has reached the maximum number of games. Please delete a game before creating a new one.',
        });
      }

      if (protectedIds.includes(id)) {
        console.warn('Protected id cannot be used', { id });
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'Team slug is not available',
        });
      }

      try {
        await db.$transaction(async (tx) => {
          const teamId = team.id;

          const game = await tx.game.create({
            data: {
              teamId,
              title,
              id,
              status: 'DRAFT',
              visibility: 'PRIVATE',
              description,
              thumbnail,
              cover: coverImage,
              aiDisclosure,
              viewportId: computeViewportId(devices, orientation),
            },
          });

          await tx.gameFile.create({
            data: {
              version,
              type: ProjectType.HTML,
              url: gameFile,
              isCurrent: true,
              gameId: game.id,
              notes,
              metadata: preview,
            },
          });

          await tx.categoriesOnGame.createMany({
            data: tags.map((tag) => ({
              gameId: game.id,
              categoryId: tag,
            })),
            skipDuplicates: true,
          });
        });
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create game. Please try again later.',
        });
      }

      return true;
    }
  );
