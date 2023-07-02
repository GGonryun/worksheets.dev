import { protectedProcedure } from '../../../trpc';
import { z } from 'zod';
import { loadWorksheetLogs } from '@worksheets/feat/structured-logging';
import { taskLogEntity } from '@worksheets/data-access/tasks';

// TODO: we only return the latest 100 logs, but we should paginate
export default protectedProcedure
  .meta({
    openapi: {
      enabled: true,
      protect: true,
      summary: 'Get logs for a worksheet',
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
    console.info(
      `getting worksheet logs for worksheet ${worksheetId}${
        executionId ? ` execution ${executionId}` : ``
      }`
    );

    const logs = await loadWorksheetLogs({
      worksheetId,
      taskId: executionId,
    });

    return logs.map((log) => ({
      ...log,
      // just in case clients insert bad data into message.
      message: `${log.message}`,
      data: JSON.stringify(log, null, 2),
    }));
  });
