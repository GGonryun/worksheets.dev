import {
  listConnectionsRequestSchema,
  listConnectionsResponseSchema,
} from '@worksheets/schemas-worksheets';
import { listUserConnections } from '@worksheets/feat/worksheets-management';
import { privateProcedure } from '../../procedures';

export default privateProcedure
  .input(listConnectionsRequestSchema)
  .output(listConnectionsResponseSchema)
  .query(
    async ({
      ctx: {
        user: { uid },
      },
    }) => {
      return await listUserConnections(uid);
    }
  );
