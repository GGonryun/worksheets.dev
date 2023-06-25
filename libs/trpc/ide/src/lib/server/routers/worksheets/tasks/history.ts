import { protectedProcedure } from '../../../trpc';
import { z } from 'zod';
import { getProcessingHistory } from '@worksheets/feat/task-processing';
import { taskEntity } from '@worksheets/data-access/tasks';

export default protectedProcedure
  .input(z.string())
  .output(z.array(taskEntity))
  .query(async ({ input, ctx: { user } }) => {
    console.info(`getting processing history for worksheet ${input}`);
    return await getProcessingHistory(input);
  });
