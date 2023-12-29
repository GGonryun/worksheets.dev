import { z } from '@worksheets/zod';
import { publicProcedure } from '../../procedures';
import { GameReportModel } from '@worksheets/prisma';
import { ANONYMOUS_USER_ID } from '@worksheets/util/misc';

export default publicProcedure
  .input(GameReportModel.pick({ gameId: true, reason: true, text: true }))
  .output(
    z.object({
      success: z.boolean(),
    })
  )
  .mutation(async ({ input: { gameId, reason, text }, ctx: { user, db } }) => {
    const userId = user?.id;
    try {
      await db.gameReport.create({
        data: {
          gameId,
          userId,
          reason,
          text,
        },
      });

      console.info(
        `Received a game report for game ${gameId} from user ${
          userId ?? ANONYMOUS_USER_ID
        }`
      );

      return { success: true };
    } catch (error) {
      console.error(
        `An unexpected error occurred while recording game play count: ${error}`
      );
      return { success: false };
    }
  });
