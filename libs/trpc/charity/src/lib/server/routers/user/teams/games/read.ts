import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { protectedTeamProcedure } from '../../../../procedures';
import { parseTeamGame, teamOwnedGameSchema } from './shared';

export default protectedTeamProcedure(['games:read'])
  .input(
    z.object({
      gameId: z.string(),
    })
  )
  .output(teamOwnedGameSchema)
  .query(async ({ ctx: { db, team }, input: { gameId } }) => {
    const game = await db.game.findFirst({
      where: {
        id: gameId,
        teamId: team.id,
      },
    });
    if (!game) {
      console.error('Game does not exist or does not belong to team', gameId);
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Game not found',
      });
    }

    return parseTeamGame(game);
  });
