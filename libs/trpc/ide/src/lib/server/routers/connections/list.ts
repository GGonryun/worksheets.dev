import {
  listUserConnectionsRequestSchema,
  listUserConnectionsResponseSchema,
} from '@worksheets/schemas-connections';
import { privateProcedure } from '../../procedures';
import { listUserConnections } from '@worksheets/feat/app-connections';

export default privateProcedure
  .input(listUserConnectionsRequestSchema)
  .output(listUserConnectionsResponseSchema)
  .query(async ({ ctx, input }) => {
    return await listUserConnections({
      userId: ctx.user.uid,
      appId: input.appId,
    });
  });
