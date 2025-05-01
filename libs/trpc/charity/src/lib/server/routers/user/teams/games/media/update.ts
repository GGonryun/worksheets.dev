import { TRPCError } from '@trpc/server';
import { mediaFormSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { protectedTeamProcedure } from '../../../../../procedures';

export default protectedTeamProcedure(['games:update', 'games:read'])
  .input(
    z.object({
      gameId: z.string(),
      form: mediaFormSchema,
    })
  )
  .mutation(async ({ ctx: { db, team }, input }) => {
    const game = await db.game.findFirst({
      where: {
        id: input.gameId,
        teamId: team.id,
      },
      include: {
        categories: true,
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

    await db.game.update({
      where: { id: game.id, teamId: team.id },
      data: {
        thumbnail: input.form.thumbnail,
        cover: input.form.coverImage,
        trailer: input.form.trailerUrl,
      },
    });
  });
