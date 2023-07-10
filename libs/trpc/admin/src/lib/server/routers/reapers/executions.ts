import { z } from 'zod';
import { pushTasksToCompletion } from '@worksheets/feat/task-processing';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';
import { publicProcedure } from '../../procedures';

export default publicProcedure
  .meta({
    openapi: {
      enabled: true,
      method: 'DELETE',
      path: '/reapers/executions',
      summary:
        'Clean up active task executions on the system and drive them towards completion',
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
    return await pushTasksToCompletion(
      input?.quantity ?? SERVER_SETTINGS.REAPER.QUANTITIES.EXECUTIONS
    );
  });
