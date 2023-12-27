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
      await db.$transaction(async (tx) => {
        const favorite = await tx.gameFavorite.findFirst({
          where: {
            gameId: gameId,
            userId: userId,
          },
        });

        // Always try to stay in sync with the client
        if (!favorite) {
          console.warn(
            'user favorite game entry does not exist',
            userId,
            gameId
          );
        } else {
          console.info('removing existing game play entry', favorite.id);
          return await tx.gameFavorite.delete({
            where: { id: favorite.id },
          });
        }
      });

      success = true;
    } catch (error) {
      console.error(`An unexpected error occurred while voting: ${error}`);
    }

    return { success };
  });
