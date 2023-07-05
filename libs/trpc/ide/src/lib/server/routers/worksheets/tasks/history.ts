import { Severity, protectedProcedure } from '../../../trpc';
import { z } from 'zod';
import { getProcessingHistory } from '@worksheets/feat/task-processing';
import { taskEntity } from '@worksheets/data-access/tasks';

export default protectedProcedure
  .meta({
    logging: Severity.ERROR,
    openapi: {
      enabled: true,
      protect: true,
      summary: 'Get execution history for a worksheet',
      description: 'Get execution history for a worksheet',
      tags: ['executions'],
      method: 'GET',
      path: '/worksheets/{worksheetId}/executions',
    },
  })
  .input(
    z.object({
      worksheetId: z.string(),
    })
  )
  .output(z.array(taskEntity))
  .query(async ({ input: { worksheetId } }) => {
    return await getProcessingHistory(worksheetId);
  });
