import { z } from '@worksheets/zod';
import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
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
    const userId = user.id;

    try {
      const exists = await db.gameFavorites.findFirst({
        where: {
          gameId: gameId,
          userId: userId,
        },
      });

      if (exists) {
        console.warn(
          `favorite already exists for user ${userId} and game ${gameId}`
        );
      } else {
        console.info(
          `creating new favorite for user ${userId} and game ${gameId}`
        );

        await db.gameFavorites.create({
          data: {
            gameId: gameId,
            userId: userId,
          },
        });
      }

      success = true;
    } catch (error) {
      console.error(`An unexpected error occurred while voting: ${error}`);
    }

    return { success };
  });
