import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { protectedTeamProcedure } from '../../../../procedures';

export default protectedTeamProcedure(['games:delete'])
  .input(
    z.object({
      gameId: z.string(),
    })
  )
  .mutation(async ({ ctx: { db }, input }) => {
    const game = await db.game.findFirst({
      where: {
        id: input.gameId,
      },
    });

    if (!game) {
      console.error('Game does not exist', input);
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Game not found',
      });
    }

    await db.$transaction([
      db.categoriesOnGame.deleteMany({
        where: {
          gameId: input.gameId,
        },
      }),
      db.gameReport.deleteMany({
        where: {
          gameId: input.gameId,
        },
      }),
      db.gameFile.deleteMany({
        where: {
          gameId: input.gameId,
        },
      }),
      db.gamePlayHistory.deleteMany({
        where: {
          gameId: input.gameId,
        },
      }),
      db.gameSession.deleteMany({
        where: {
          gameId: input.gameId,
        },
      }),
      db.gameStorage.deleteMany({
        where: {
          gameId: input.gameId,
        },
      }),
      db.gameScore.deleteMany({
        where: {
          gameId: input.gameId,
        },
      }),
      db.gameAchievement.deleteMany({
        where: {
          gameId: input.gameId,
        },
      }),
      db.gamePlayAnalytics.deleteMany({
        where: {
          gameId: input.gameId,
        },
      }),
      db.task.deleteMany({
        where: {
          gameId: input.gameId,
        },
      }),
    ]);

    await db.game.delete({
      where: { id: input.gameId },
    });

    return { success: true };
  });
