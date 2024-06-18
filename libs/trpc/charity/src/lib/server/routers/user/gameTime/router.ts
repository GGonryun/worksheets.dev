import { TRPCError } from '@trpc/server';
import { TasksService } from '@worksheets/services/tasks';
import { startBackgroundJob } from '@worksheets/util/jobs';
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

      const referral = await db.user.findMany({
        where: {
          referredByUserId: user.id,
        },
      });

      const friends = await db.friendship.findMany({
        where: {
          userId: user.id,
          isFavorite: true,
        },
        select: {
          friendId: true,
        },
      });

      await Promise.allSettled([
        // reward my referrals when I play games.
        referral.map((r) =>
          tasks.trackQuest({
            questId: 'REFERRAL_PLAY_MINUTES_INFINITE',
            userId: r.id,
            repetitions: increment,
          })
        ),
        // reward my best friends when I play games.
        friends.map((f) =>
          tasks.trackQuest({
            questId: 'FRIEND_PLAY_MINUTES_INFINITE',
            userId: f.friendId,
            repetitions: increment,
          })
        ),
        startBackgroundJob('track/play/minutes', {
          gameId: game.id,
          userId: user.id,
          increment,
        }),
      ]);
    }),
});
