import { z } from 'zod';
import { getTaskExecution } from '@worksheets/feat/task-processing';
import { taskEntity } from '@worksheets/schemas-executions';
import { privateProcedure } from '../../../procedures';

export default privateProcedure
  .input(
    z.object({
      executionId: z.string(),
    })
  )
  .output(taskEntity)
  .query(async ({ input: { executionId } }) => {
    return await getTaskExecution(executionId);
  });
