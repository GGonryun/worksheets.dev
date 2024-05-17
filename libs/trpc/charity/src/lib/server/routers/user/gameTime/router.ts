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
        tasks.trackQuest({
          questId: 'PLAY_MINUTES_INFINITE',
          userId: user.id,
          repetitions: increment,
        }),
        tasks.trackQuest({
          questId: 'REFERRAL_PLAY_MINUTES_INFINITE',
          userId: user.id,
          repetitions: increment,
        }),
        tasks.trackQuest({
          questId: 'FRIEND_PLAY_MINUTES_INFINITE',
          userId: user.id,
          repetitions: increment,
        }),
      ]);
    }),
});
