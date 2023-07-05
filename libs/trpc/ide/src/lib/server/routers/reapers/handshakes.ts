import { z } from 'zod';
import { publicProcedure } from '../../trpc';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';
import { cleanUpOldHandshakes } from '@worksheets/feat/execution-settings';

export default publicProcedure
  .meta({
    openapi: {
      enabled: true,
      protect: true,
      method: 'DELETE',
      path: '/reapers/handshakes',
      summary: 'Clean up active old handshakes on the system',
      tags: ['reapers'],
    },
  })
  .input(
    z
      .object({
        quantity: z.number().optional(),
      })
      .optional()
  )
  .output(z.string())
  .mutation(async ({ input }) => {
    await cleanUpOldHandshakes(
      input?.quantity ?? SERVER_SETTINGS.REAPER.QUANTITIES.HANDSHAKES
    );
    return 'ok';
  });
