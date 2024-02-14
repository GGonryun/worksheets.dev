import { ReportReason } from '@prisma/client';
import { z } from 'zod';

import { publicProcedure } from '../../../procedures';

export default publicProcedure
  .input(
    z.object({
      gameId: z.string(),
      reason: z.nativeEnum(ReportReason),
      text: z.string(),
    })
  )
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
