import { TRPCError } from '@trpc/server';
import { isPrismaError } from '@worksheets/prisma';
import { versionFormSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { protectedTeamProcedure } from '../../../../../procedures';

export default protectedTeamProcedure
  .input(
    z.object({
      gameId: z.string(),
      form: versionFormSchema,
    })
  )
  .output(
    z.union([
      z.object({
        ok: z.literal(false),
        field: versionFormSchema.keyof(),
        message: z.string(),
      }),
      z.object({
        ok: z.literal(true),
        id: z.string(),
      }),
    ])
  )
  .mutation(async ({ ctx: { db, team, user }, input }) => {
    const { gameId, form } = input;
    const game = await db.game.findFirst({
      where: {
        id: gameId,
        teamId: team.id,
      },
    });

    if (!game) {
      console.error(
        'Game does not exist or does not belong to the team or the user is not a member of the team',
        {
          gameId,
          teamId: team.id,
        }
      );

      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Game not found',
      });
    }

    try {
      const gameFile = await db.gameFile.create({
        data: {
          gameId: game.id,
          notes: form.notes,
          version: form.version,
          url: form.gameFile,
          metadata: form.preview,
          uploaderId: user.id,
          isCurrent: false,
        },
      });
      return {
        ok: true,
        id: gameFile.id,
      };
    } catch (error) {
      if (isPrismaError(error)) {
        if (error.code === 'P2002') {
          return {
            ok: false,
            field: 'version',
            message: 'Version already exists',
          };
        }
      }
      throw error;
    }
  });
