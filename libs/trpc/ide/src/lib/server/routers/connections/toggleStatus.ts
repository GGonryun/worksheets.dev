import {
  toggleConnectionStatusRequestSchema,
  toggleConnectionStatusResponseSchema,
} from '@worksheets/schemas-connections';
import { privateProcedure } from '../../procedures';
import { toggleConnectionStatus } from '@worksheets/feat/app-connections';

export default privateProcedure
  .input(toggleConnectionStatusRequestSchema)
  .output(toggleConnectionStatusResponseSchema)
  .mutation(async ({ ctx, input }) => {
    await toggleConnectionStatus({
      appId: input.appId,
      userId: ctx.user.uid,
    });

    return { ok: true };
  });
