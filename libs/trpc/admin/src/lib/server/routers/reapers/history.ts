import { z } from 'zod';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';
import { reapExecutionHistory } from '@worksheets/feat/task-processing';
import { publicProcedure } from '../../procedures';

export default publicProcedure
  .meta({
    openapi: {
      enabled: true,
      method: 'DELETE',
      path: '/reapers/history',
      summary: 'Reap old execution histories and quotas',
      description:
        'Reap any execution histories, and snapshots, and logs that have expired',
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
    return await reapExecutionHistory(
      input?.quantity ?? SERVER_SETTINGS.REAPER.QUANTITIES.EXECUTION_HISTORY
    );
  });
