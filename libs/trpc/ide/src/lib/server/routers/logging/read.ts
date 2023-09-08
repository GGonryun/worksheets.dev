import { z } from 'zod';
import { privateProcedure } from '../../procedures';
import { LogModel } from '@worksheets/prisma';

export default privateProcedure
  .input(
    z.object({
      id: z.string().optional(),
    })
  )
  .output(LogModel.nullable().optional())
  .mutation(async ({ ctx, input }) => {
    const result = await ctx.db.log.findUnique({
      where: {
        id: input.id,
      },
    });
    return result;
  });
