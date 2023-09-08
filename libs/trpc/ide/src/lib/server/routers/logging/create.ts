import { LogModel } from '@worksheets/prisma';
import { privateProcedure } from '../../procedures';

export default privateProcedure
  .input(LogModel.omit({ id: true, createdAt: true, updatedAt: true }))
  .output(LogModel)
  .mutation(async ({ ctx, input }) => {
    const result = await ctx.db.log.create({
      data: {
        ...input,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return result;
  });
