import { Severity, protectedProcedure } from '../../../trpc';
import { z } from 'zod';
import { loadWorksheetLogs } from '@worksheets/feat/structured-logging';
import { taskLogEntity } from '@worksheets/data-access/tasks';
import { addDaysToCurrentTime } from '@worksheets/util/time';

export default protectedProcedure
  .meta({
    logging: Severity.ERROR,
    openapi: {
      enabled: true,
      protect: true,
      summary:
        'Gets your 20 most recent logs in the last 24 hours for a worksheet',
      description: 'Get logs for a worksheet',
      tags: ['logs'],
      method: 'GET',
      path: '/worksheets/{worksheetId}/logs',
    },
  })
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
