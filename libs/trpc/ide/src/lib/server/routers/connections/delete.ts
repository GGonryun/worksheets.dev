import { privateProcedure } from '../../procedures';
import { deleteUserConnections } from '@worksheets/feat/app-connections';
import { z } from '@worksheets/zod';

const deleteUserConnectionRequestSchema = z.object({
  connectionIds: z.array(z.string()),
});

const deleteUserConnectionResponseSchema = z.object({
  ok: z.boolean(),
});

export default privateProcedure
  .input(deleteUserConnectionRequestSchema)
  .output(deleteUserConnectionResponseSchema)
  .mutation(async ({ ctx, input }) => {
    return await deleteUserConnections({
      userId: ctx.user.uid,
      connectionIds: input.connectionIds,
    });
  });
