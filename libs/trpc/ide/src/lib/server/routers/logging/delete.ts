import { LogModel } from '@worksheets/prisma';
import { privateProcedure } from '../../procedures';

export default privateProcedure
  .input(LogModel.pick({ id: true }))
  .output(LogModel)
  .mutation(async ({ ctx, input }) => {
    const result = await ctx.db.log.delete({
      where: {
        id: input.id,
      },
    });
    return result;
  });
