import { z } from 'zod';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';
import { publicProcedure } from '../../procedures';
import { reapOldExecutions } from '@worksheets/feat-method-execution';

export default publicProcedure
  .meta({
    openapi: {
      enabled: true,
      method: 'DELETE',
      path: '/reapers/executions',
      summary: 'Clean up old method executions on the system',
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
    return await reapOldExecutions(
      input?.quantity ?? SERVER_SETTINGS.REAPER.QUANTITIES.EXECUTIONS
    );
  });
