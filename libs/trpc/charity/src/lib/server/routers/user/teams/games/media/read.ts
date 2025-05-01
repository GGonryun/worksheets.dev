import { TRPCError } from '@trpc/server';
import { mediaFormSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { protectedTeamProcedure } from '../../../../../procedures';

const editMediaFormSchema = mediaFormSchema.extend({ id: z.string() });

export default protectedTeamProcedure(['games:read'])
  .input(
    z.object({
      gameId: z.string(),
    })
  )
  .output(editMediaFormSchema)
  .query(async ({ ctx: { db, team }, input }) => {
    const { gameId } = input;
    const game = await db.game.findFirst({
      where: {
        id: gameId,
        teamId: team.id,
      },
      include: {
        categories: true,
        team: {
          include: {
            members: true,
          },
        },
      },
    });

    if (!game) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Game not found',
      });
    }
    return {
      id: game.id,
      thumbnail: game.thumbnail,
      coverImage: game.cover,
      trailerUrl: game.trailer ?? '',
    };
  });
