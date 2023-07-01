import { z } from 'zod';

import { processTask } from '@worksheets/feat/task-processing';
import { publicProcedure } from '../../trpc';

export default publicProcedure
  .meta({
    openapi: {
      enabled: true,
      method: 'POST',
      path: '/executions/{taskId}/process',
      summary: 'Process a task execution',
    },
  })
  .input(
    z.object({
      taskId: z.string(),
    })
  )
  .output(z.string())
  .mutation(async ({ input: { taskId } }) => {
    console.info(`Processing task execution ${taskId}`);
    return await processTask(taskId);
  });
