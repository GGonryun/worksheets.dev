import { TRPCError } from '@trpc/server';
import { protectedProcedure } from '../../procedures';
import { z } from '@worksheets/zod';

export default protectedProcedure
  .input(
    z.object({
      url: z.string(),
    })
  )
  .output(
    z.object({
      okay: z.boolean(),
    })
  )
  .mutation(async ({ input: { url }, ctx: { user, db } }) => {
    const file = await db.storedFile.findFirst({
      where: {
        url,
        userId: user.id,
      },
    });

    if (!file) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'File not found',
      });
    }

    await db.storedFile.delete({
      where: {
        id: file.id,
      },
    });

    return {
      okay: true,
    };
  });
