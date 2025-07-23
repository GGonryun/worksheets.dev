import { SESSION_AGE_MINUTES } from '@worksheets/util/settings';
import { minutesAgo } from '@worksheets/util/time';
import { z } from 'zod';

import { protectedProcedure } from '../../../../procedures';
import { t } from '../../../../trpc';

export default t.router({
  start: protectedProcedure
    .input(
      z.object({
        gameId: z.string(),
      })
    )
    .output(
      z.object({
        sessionId: z.string(),
        username: z.string(),
      })
    )
    .mutation(async ({ input: { gameId }, ctx: { db, user } }) => {
      // try to find an existing session that at least 30 minutes old
      const existingSession = await db.gameSession.findFirst({
        where: {
          gameId: gameId,
          userId: user.id,
          createdAt: {
            gte: minutesAgo(SESSION_AGE_MINUTES),
          },
        },
      });

      if (existingSession) {
        console.info('Found existing session', existingSession.id);
        return { sessionId: existingSession.id, username: user.username };
      }

      // create a new session
      const session = await db.gameSession.create({
        data: {
          gameId: gameId,
          userId: user.id,
        },
      });

      console.info('Created new session', session.id);
      return { sessionId: session.id, username: user.username };
    }),
});
