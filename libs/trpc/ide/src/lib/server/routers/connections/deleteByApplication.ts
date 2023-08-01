import {
  deleteByApplicationRequestSchema,
  deleteByApplicationResponseSchema,
} from '@worksheets/schemas-connections';
import { privateProcedure } from '../../procedures';
import { deleteByApplication } from '@worksheets/feat/app-connections';

export default privateProcedure
  .input(deleteByApplicationRequestSchema)
  .output(deleteByApplicationResponseSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      await deleteByApplication({
        appId: input.appId,
        userId: ctx.user.uid,
      });

      return { ok: true };
    } catch (error) {
      console.error('failed to delete by application', error);
      return { ok: false };
    }
  });
