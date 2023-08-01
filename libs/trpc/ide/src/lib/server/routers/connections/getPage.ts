import { privateProcedure } from '../../procedures';
import {
  getConnectionsPageRequestSchema,
  getConnectionsPageResponseSchema,
} from '@worksheets/schemas-connections';

import { getConnectionsPage } from '@worksheets/feat/app-connections';

export default privateProcedure
  .input(getConnectionsPageRequestSchema)
  .output(getConnectionsPageResponseSchema)
  .query(
    async ({
      ctx: {
        user: { uid },
      },
    }) => {
      return await getConnectionsPage(uid);
    }
  );
