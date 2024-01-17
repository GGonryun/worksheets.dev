import { z } from '@worksheets/zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .input(
    z.object({
      gameId: z.string(),
    })
  )
  .mutation(async ({ input: { gameId }, ctx: { db, user } }) => {
    const userId = user.id;
    console.info('logging game play for authorized user', { userId, gameId });

    const gamePlay = await db.gamePlay.findFirst({
      where: {
        gameId,
        userId,
      },
    });

    if (!gamePlay) {
      await db.gamePlay.create({
        data: {
          gameId,
          userId,
          total: 1,
        },
      });
    } else {
      await db.gamePlay.update({
        where: {
          id: gamePlay.id,
        },
        data: {
          total: {
            increment: 1,
          },
        },
      });
    }
  });
