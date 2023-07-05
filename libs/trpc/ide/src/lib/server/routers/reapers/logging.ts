import { publicProcedure } from '../../trpc';
import { z } from 'zod';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';
import { reapExecutionLogs } from '@worksheets/feat/task-processing';

export default publicProcedure
  .meta({
    openapi: {
      enabled: true,
      method: 'DELETE',
      path: '/reapers/logging',
      summary: 'Reap old execution logs',
      description: 'Reap any execution logs that have expired',
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
    return await reapExecutionLogs(
      input?.quantity ?? SERVER_SETTINGS.REAPER.QUANTITIES.EXECUTION_LOGS
    );
  });
