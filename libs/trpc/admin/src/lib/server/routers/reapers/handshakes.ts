import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';
import { cleanUpOldHandshakes } from '@worksheets/feat/execution-settings';
import { z } from 'zod';
import { publicProcedure } from '../../procedures';

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
  .output(z.number())
  .mutation(async ({ input }) => {
    return await cleanUpOldHandshakes(
      input?.quantity ?? SERVER_SETTINGS.REAPER.QUANTITIES.HANDSHAKES
    );
  });
