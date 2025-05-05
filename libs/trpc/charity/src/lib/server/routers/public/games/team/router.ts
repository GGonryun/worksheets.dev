import { TRPCError } from '@trpc/server';
import { parseTeam, teamSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { publicProcedure } from '../../../../procedures';
import { t } from '../../../../trpc';

export default t.router({
  find: publicProcedure
    .input(
      z.object({
        gameId: z.string(),
      })
    )
    .output(teamSchema)
    .query(async ({ ctx: { db }, input: { gameId } }) => {
      const team = await db.team.findFirst({
        where: {
          games: {
            some: {
              id: gameId,
            },
          },
        },
        include: {
          members: true,
          games: true,
        },
      });

      if (!team) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Team for game with ID ${gameId} not found`,
        });
      }

      return parseTeam(team);
    }),
});
