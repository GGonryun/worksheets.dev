import { protectedProcedure } from '../../trpc';
import { z } from 'zod';
import { createOAuthUrl } from '@worksheets/feat/execution-settings';

export default protectedProcedure
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
      console.info('creating oauth url', connectionId);

      return await createOAuthUrl({
        userId: uid,
        connectionId,
        appId,
        settingId,
      });
    }
  );
