import { privateProcedure } from '../../procedures';
import { LogModel } from '@worksheets/prisma';

export default privateProcedure
  .input(LogModel)
  .output(LogModel)
  .mutation(async ({ ctx, input }) => {
    const result = await ctx.db.log.update({
      where: {
        id: input.id,
      },
      data: input,
    });
    return result;
  });
