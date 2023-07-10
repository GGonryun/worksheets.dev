import { z } from 'zod';
import { getProcessingHistory } from '@worksheets/feat/task-processing';
import { taskEntity } from '@worksheets/schemas-executions';
import { privateProcedure } from '../../../procedures';

export default privateProcedure
  .input(
    z.object({
      worksheetId: z.string(),
    })
  )
  .output(z.array(taskEntity))
  .query(async ({ input: { worksheetId } }) => {
    return await getProcessingHistory(worksheetId);
  });
