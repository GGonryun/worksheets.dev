import { z } from '@worksheets/zod';
import { publicProcedure } from '../../procedures';

export default publicProcedure
  .input(
    z.object({
      gameId: z.string(),
    })
  )
  .output(
    z.object({
      success: z.boolean(),
    })
  )
  .mutation(async ({ input: { gameId }, ctx: { user, db } }) => {
    let success = false;

    try {
      const result = await db.$transaction(async (tx) => {
        const plays = await tx.gamePlay.findFirst({
          where: {
            gameId,
            userId: user?.id ?? null,
          },
        });

        if (!plays) {
          console.log('creating new game play entry');
          return await db.gamePlay.create({
            data: {
              gameId,
              userId: user?.id,
              total: 1,
            },
          });
        } else {
          const id = plays.id;
          const total = plays.total + 1;
          console.log('updating existing game play entry', id, total);

          return await tx.gamePlay.update({
            where: { id },
            data: { total },
          });
        }
      });
      console.log("updating game's total plays", result);
      success = true;
    } catch (error) {
      console.error(
        `An unexpected error occurred while recording game play count: ${error}`
      );
    }

    return { success };
  });
