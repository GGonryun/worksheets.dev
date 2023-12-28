import { z } from '@worksheets/zod';
import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .input(
    z.object({
      gameId: z.string(),
      vote: z.union([z.literal('up'), z.literal('down')]),
    })
  )
  .output(
    z.object({
      success: z.boolean(),
    })
  )
  .mutation(async ({ input: { gameId, vote }, ctx: { user, db } }) => {
    try {
      // check if user has already voted
      const exists = await db.gameVote.findFirst({
        where: {
          gameId: gameId,
          userId: user.id,
        },
      });
      if (exists) {
        // if vote is the same, remove vote.
        if (
          (exists.liked && vote === 'up') ||
          (!exists.liked && vote === 'down')
        ) {
          await db.gameVote.delete({
            where: { id: exists.id },
          });

          console.info(`Deleted a game vote: ${JSON.stringify(exists)}`);

          return { success: true };
        } else {
          // update vote.
          await db.gameVote.update({
            where: { id: exists.id },
            data: { liked: vote === 'up' ? true : false },
          });

          console.info(`Updated a game vote: ${JSON.stringify(exists)}`);

          return { success: true };
        }
      } else {
        console.info(`No existing vote found for game ${gameId}`);

        const result = await db.gameVote.create({
          data: {
            gameId: gameId,
            userId: user.id,
            liked: vote === 'up' ? true : false,
          },
        });

        console.info(`Added a game vote: ${JSON.stringify(result)}`);
        return { success: true };
      }
    } catch (error) {
      console.error(`An unexpected error occurred while voting: ${error}`);
    }

    return { success: false };
  });
