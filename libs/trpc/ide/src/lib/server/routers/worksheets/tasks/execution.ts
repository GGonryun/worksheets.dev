import { z } from 'zod';
import { protectedProcedure } from '../../../trpc';
import { taskEntity } from '@worksheets/data-access/tasks';
import { getTaskExecution } from '@worksheets/feat/task-processing';

export default protectedProcedure
  .meta({
    openapi: {
      enabled: true,
      protect: true,
      summary: 'Get execution details',
      description: 'Get execution details for a worksheet',
      tags: ['executions'],
      method: 'GET',
      path: '/executions/{executionId}',
    },
  })
  .input(
    z.object({
      executionId: z.string(),
    })
  )
  .output(taskEntity)
  .query(async ({ input: { executionId } }) => {
    return await getTaskExecution(executionId);
  });
