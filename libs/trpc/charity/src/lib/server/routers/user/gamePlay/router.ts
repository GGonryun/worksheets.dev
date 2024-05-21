import { TRPCError } from '@trpc/server';
import { TasksService } from '@worksheets/services/tasks';
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
      const tasks = new TasksService(db);
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

      Promise.all([
        tasks.trackGameQuests({
          gameId: game.id,
          type: 'PLAY_GAME',
          userId: user.id,
          repetitions: 1,
        }),
        tasks.trackGameActions({
          gameId: game.id,
          type: 'PLAY_GAME',
          userId: user.id,
          repetitions: 1,
        }),
      ]);
    }),
});
