import { z } from 'zod';
import { pushTasksToCompletion } from '@worksheets/feat/task-processing';
import { publicProcedure } from '../../trpc';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';
import { logger } from '@worksheets/feat/logging';

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
  .output(z.string())
  .mutation(async ({ input }) => {
    logger.info('Running task reaper');
    await pushTasksToCompletion(
      input?.quantity ?? SERVER_SETTINGS.REAPER.QUANTITIES.EXECUTIONS
    );
    return 'ok';
  });
