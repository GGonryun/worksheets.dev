import { privateProcedure } from '../../procedures';
import {
  listConnectionsRequestSchema,
  listConnectionsResponseSchema,
} from '@worksheets/schemas-worksheets';
import { listUserConnections } from '@worksheets/feat/worksheets-management';

export default privateProcedure
  .meta({
    openapi: {
      enabled: true,
      protect: true,
      method: 'GET',
      path: '/connections',
      summary: 'List connections',
      tags: ['connections'],
    },
  })
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
