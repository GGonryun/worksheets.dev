import { z } from 'zod';

import { processTask } from '@worksheets/feat/task-processing';
import { publicProcedure } from '../../trpc';

export default publicProcedure
  .meta({
    openapi: {
      enabled: true,
      method: 'POST',
      path: '/executions/{executionId}/process',
      summary: 'Process a task execution',
      tags: ['executions'],
    },
  })
  .input(
    z.object({
      executionId: z.string(),
    })
  )
  .output(z.string())
  .mutation(async ({ input: { executionId } }) => {
    return await processTask(executionId);
  });
