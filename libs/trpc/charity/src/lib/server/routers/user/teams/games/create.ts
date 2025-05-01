import { ProjectType } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { createGameFormSchema } from '@worksheets/util/types';
import { computeViewportId } from '@worksheets/util/viewport';
import { z } from 'zod';

import { protectedTeamProcedure } from '../../../../procedures';

export default protectedTeamProcedure(['games:create'])
  .input(createGameFormSchema)
  .output(z.any())
  .mutation(
    async ({
      ctx: { db, user, team },
      input: {
        title,
        slug,
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
      try {
        await db.$transaction(async (tx) => {
          const teamId = team.id;
          const ownerId = user.id;

          const game = await tx.game.create({
            data: {
              teamId,
              ownerId,
              title,
              slug,
              status: 'UNPUBLISHED',
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
        console.error('Error creating game:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create game. Please try again later.',
          cause: error,
        });
      }

      return true;
    }
  );
