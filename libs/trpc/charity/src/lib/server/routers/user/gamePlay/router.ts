import { TRPCError } from '@trpc/server';
import { QuestsService } from '@worksheets/services/quests';
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
      const quests = new QuestsService(db);
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

      await quests.trackType({
        questType: 'PLAY_GAME',
        userId: user.id,
        input: {},
      });
    }),
});
