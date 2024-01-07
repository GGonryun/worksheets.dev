import { protectedProcedure } from '../../procedures';
import { z } from '@worksheets/zod';

export default protectedProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .output(
    z.object({
      okay: z.boolean(),
    })
  )
  .mutation(async ({ input: { id }, ctx: { user, db } }) => {
    await db.storedFile.delete({
      where: {
        id,
        userId: user.id,
      },
    });

    return {
      okay: true,
    };
  });
