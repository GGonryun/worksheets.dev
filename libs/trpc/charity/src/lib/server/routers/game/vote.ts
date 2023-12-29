import { z } from '@worksheets/zod';
import { publicProcedure } from '../../procedures';

export default publicProcedure
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
  .mutation(async ({ input: { gameId, vote }, ctx: { req, db } }) => {
    const ip: string =
      (req.headers['x-forwarded-for'] as string) ||
      req.socket.remoteAddress ||
      '0.0.0.0';

    try {
      const result = await db.gameVoteSubmission.create({
        data: {
          gameId: gameId,
          vote: vote === 'up' ? 1 : -1,
          ip: ip,
        },
      });

      console.info(`Created a game vote submission: ${JSON.stringify(result)}`);

      return { success: true };
    } catch (error) {
      console.error(`An unexpected error occurred while voting: ${error}`);
    }

    return { success: false };
  });
