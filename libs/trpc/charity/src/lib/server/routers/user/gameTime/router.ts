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
        increment: z.number(), // in seconds
      })
    )
    .mutation(async ({ input: { increment, gameId }, ctx: { user, db } }) => {
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

      // TODO: add lottery game drops again.

      await Promise.allSettled([
        tasks.trackManyQuests({
          questIds: [
            'REFERRAL_PLAY_MINUTES_INFINITE',
            'FRIEND_PLAY_MINUTES_INFINITE',
          ],
          userId: user.id,
          repetitions: increment,
        }),
        tasks.trackGameQuests({
          gameId: game.id,
          type: 'PLAY_MINUTES',
          userId: user.id,
          repetitions: increment,
        }),
        tasks.trackGameActions({
          gameId: game.id,
          type: 'PLAY_MINUTES',
          userId: user.id,
          repetitions: increment,
        }),
      ]);
    }),
});
