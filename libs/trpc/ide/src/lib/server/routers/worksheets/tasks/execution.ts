import { z } from 'zod';
import { protectedProcedure } from '../../../trpc';
import { taskEntity } from '@worksheets/data-access/tasks';
import { getTaskExecution } from '@worksheets/feat/task-processing';

export default protectedProcedure
  .input(z.string())
  .output(taskEntity)
  .query(async ({ input }) => {
    console.info(`getting task execution details for ${input}`);
    return await getTaskExecution(input);
  });
