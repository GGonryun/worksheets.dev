import { z } from '@worksheets/zod';

import { publicProcedure } from '../../../procedures';

export default publicProcedure
  .input(
    z.object({
      gameId: z.string(),
    })
  )

  .mutation(async ({ input: { gameId }, ctx: { db } }) => {
    console.info('logging game play from anonymous user', { gameId });

    const result = await db.$transaction(async (tx) => {
      const gamePlay = await tx.gamePlay.findFirst({
        where: {
          gameId,
        },
      });

      if (!gamePlay) {
        return await db.gamePlay.create({
          data: {
            gameId,
            total: 1,
          },
        });
      } else {
        return await tx.gamePlay.update({
          where: { id: gamePlay.id },
          data: {
            total: {
              increment: 1,
            },
          },
        });
      }
    });
    console.info("updating game's total plays", result);
  });
