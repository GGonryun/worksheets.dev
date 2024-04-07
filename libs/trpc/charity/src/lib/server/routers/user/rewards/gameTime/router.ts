import { TRPCError } from '@trpc/server';
import { QuestsService } from '@worksheets/services/quests';
import { z } from 'zod';

import { protectedProcedure } from '../../../../procedures';
import { t } from '../../../../trpc';

const quests = new QuestsService();

export default t.router({
  track: protectedProcedure
    .input(
      z.object({
        gameId: z.string(),
        increment: z.number(), // in seconds
      })
    )
    .mutation(async ({ input: { increment, gameId }, ctx: { user, db } }) => {
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

      await Promise.all([
        quests.trackType({
          questType: 'PLAY_MINUTES',
          userId: user.id,
          input: { increment },
        }),
        quests.trackType({
          questType: 'REFERRAL_PLAY_MINUTES',
          userId: user.id,
          input: { increment },
        }),
        quests.trackType({
          questType: 'FRIEND_PLAY_MINUTES',
          userId: user.id,
          input: { increment },
        }),
      ]);
    }),
});
