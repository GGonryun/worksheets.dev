import { TRPCError } from '@trpc/server';
import { startBackgroundJob } from '@worksheets/util/jobs';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';
import { t } from '../../../trpc';

export default t.router({
  track: protectedProcedure
    .input(
      z.object({
        gameId: z.string(),
      })
    )
    .mutation(async ({ input: { gameId }, ctx: { user, db } }) => {
      const game = await db.game.findFirst({
        where: {
          id: gameId,
        },
        select: {
          id: true,
          title: true,
        },
      });

      if (!game) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Game not found',
        });
      }

      startBackgroundJob('track/play/game', {
        gameId: game.id,
        userId: user.id,
      });
    }),
});
