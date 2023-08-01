import {
  getOAuthUrlRequestSchema,
  getOAuthUrlResponseSchema,
} from '@worksheets/schemas-connections';
import { privateProcedure } from '../../procedures';

import { createOAuthUrl } from '@worksheets/feat/app-connections';

export default privateProcedure
  .input(getOAuthUrlRequestSchema)
  .output(getOAuthUrlResponseSchema)
  .mutation(
    async ({
      input: { appId, fieldId },
      ctx: {
        user: { uid },
      },
    }) => {
      return await createOAuthUrl({ userId: uid, appId, fieldId });
    }
  );
