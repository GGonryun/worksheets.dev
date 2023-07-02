import { z } from 'zod';
import { pushTasksToCompletion } from '@worksheets/feat/task-processing';
import { publicProcedure } from '../../trpc';

export default publicProcedure
  .meta({
    openapi: {
      enabled: true,
      method: 'DELETE',
      path: '/executions/reaper',
      summary: 'Clean up task executions',
      tags: ['executions'],
    },
  })
  .input(
    z
      .object({
        timestamp: z.number().optional(),
      })
      .optional()
  )
  .output(z.string())
  .mutation(async ({ input }) => {
    console.info(`Reaping task execution`, input);
    await pushTasksToCompletion(20);
    return 'ok';
  });
