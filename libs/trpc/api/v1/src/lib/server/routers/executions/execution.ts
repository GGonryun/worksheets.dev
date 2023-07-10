import { getTaskExecution } from '@worksheets/feat/task-processing';
import { privateProcedure } from '../../procedures';
import {
  getExecutionRequestSchema,
  getExecutionResponseSchema,
} from '@worksheets/schemas-executions';

export default privateProcedure
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
  .input(getExecutionRequestSchema)
  .output(getExecutionResponseSchema)
  .query(async ({ input: { executionId } }) => {
    return await getTaskExecution(executionId);
  });
