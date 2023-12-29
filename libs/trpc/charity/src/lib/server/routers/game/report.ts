import { z } from '@worksheets/zod';
import { publicProcedure } from '../../procedures';
import { GameReportModel } from '@worksheets/prisma';

export default publicProcedure
  .input(GameReportModel.pick({ gameId: true, reason: true, text: true }))
  .output(
    z.object({
      success: z.boolean(),
    })
  )
  .mutation(async ({ input: { gameId, reason, text }, ctx: { db } }) => {
    try {
      await db.gameReport.create({
        data: {
          gameId,
          reason,
          text,
        },
      });

      console.info(`Received a game report for game ${gameId} from user`);

      return { success: true };
    } catch (error) {
      console.error(
        `An unexpected error occurred while recording game play count: ${error}`
      );
      return { success: false };
    }
  });
