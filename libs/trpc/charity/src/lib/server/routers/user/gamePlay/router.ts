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

      await tasks.trackManyQuests({
        questIds: [
          'PLAY_GAME_DAILY_5',
          'PLAY_GAME_WEEKLY_25',
          'PLAY_GAME_INFINITE',
        ],
        userId: user.id,
        repetitions: 1,
      });
    }),
});
