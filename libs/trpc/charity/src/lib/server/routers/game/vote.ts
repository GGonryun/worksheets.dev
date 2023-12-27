import { z } from '@worksheets/zod';
import { protectedProcedure } from '../../procedures';
import { TRPCError } from '@trpc/server';
import { Prisma } from '@prisma/client';

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
  .mutation(async ({ input: { gameId, vote }, ctx: { db } }) => {
    let success = false;

    try {
      const result = await db.gamePlay.create({
        data: {
          address,
        },
      });

      console.info(`Added a game vote: ${JSON.stringify(result)}`);
      success = true;
    } catch (error) {
      console.error(`An unexpected error occured while voting: ${error}`);
    }

    return { success };
  });
