import {
  updateConnectionPropertyRequestSchema,
  updateConnectionPropertyResponseSchema,
} from '@worksheets/schemas-connections';
import { privateProcedure } from '../../procedures';
import { updateConnectionProperty } from '@worksheets/feat/app-connections';

export default privateProcedure
  .input(updateConnectionPropertyRequestSchema)
  .output(updateConnectionPropertyResponseSchema)
  .mutation(async ({ ctx, input }) => {
    await updateConnectionProperty({
      userId: ctx.user.uid,
      appId: input.appId,
      fieldId: input.fieldId,
      value: input.value,
    });

    return { ok: true };
  });
