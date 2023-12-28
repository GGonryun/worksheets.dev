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
      const exists = await db.gameFavorite.findFirst({
        where: {
          gameId: gameId,
          userId: userId,
        },
      });

      if (exists) {
        // delete existing favorite
        await db.gameFavorite.delete({
          where: {
            id: exists.id,
          },
        });

        console.info(`deleted existing favorite: ${JSON.stringify(exists)}`);
      } else {
        await db.gameFavorite.create({
          data: {
            gameId: gameId,
            userId: userId,
          },
        });

        console.info(
          `created new favorite for user ${userId} and game ${gameId}`
        );
      }

      success = true;
    } catch (error) {
      console.error(`An unexpected error occurred while voting: ${error}`);
    }

    return { success };
  });
