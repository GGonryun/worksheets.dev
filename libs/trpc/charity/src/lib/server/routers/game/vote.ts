import { z } from '@worksheets/zod';
import { protectedProcedure } from '../../procedures';

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
    let success = false;

    try {
      const result = await db.gameVote.create({
        data: {
          gameId: gameId,
          userId: user.id,
          liked: vote === 'up' ? true : false,
        },
      });

      console.info(`Added a game vote: ${JSON.stringify(result)}`);
      success = true;
    } catch (error) {
      console.error(`An unexpected error occurred while voting: ${error}`);
    }

    return { success };
  });
