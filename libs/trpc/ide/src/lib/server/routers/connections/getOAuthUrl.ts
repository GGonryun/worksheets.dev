import { z } from 'zod';
import { createOAuthUrl } from '@worksheets/feat/execution-settings';
import { privateProcedure } from '../../procedures';

export default privateProcedure
  .input(
    z.object({
      appId: z.string(),
      settingId: z.string(),
      connectionId: z.string(),
    })
  )
  .output(z.object({ url: z.string() }))
  .mutation(
    async ({
      input: { appId, settingId, connectionId },
      ctx: {
        user: { uid },
      },
    }) => {
      return await createOAuthUrl();
    }
  );
