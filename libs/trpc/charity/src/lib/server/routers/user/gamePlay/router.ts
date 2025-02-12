import { TRPCError } from '@trpc/server';
import { TasksService } from '@worksheets/services/tasks';
import { retryTransaction } from '@worksheets/util/prisma';
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
      const userId = user.id;
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

      await retryTransaction(db, async (tx) => {
        const tasks = new TasksService(tx);
        await tasks.trackGameActions({
          gameId,
          userId,
          type: 'PLAY_GAME',
          repetitions: 1,
        });
      });
    }),
});
