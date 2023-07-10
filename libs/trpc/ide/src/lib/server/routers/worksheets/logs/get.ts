import { z } from 'zod';
import { loadWorksheetLogs } from '@worksheets/feat/structured-logging';
import { addDaysToCurrentTime } from '@worksheets/util/time';
import { privateProcedure } from '../../../procedures';
import { taskLogEntity } from '@worksheets/schemas-executions';

export default privateProcedure
  .input(
    z.object({
      worksheetId: z.string(),
      executionId: z.string().optional(),
    })
  )
  .output(z.array(taskLogEntity))
  .query(async ({ input: { worksheetId, executionId } }) => {
    return await loadWorksheetLogs({
      worksheetId,
      taskId: executionId,
      limit: 20,
      start: addDaysToCurrentTime(-1).getTime(),
      end: Date.now(),
    });
  });
