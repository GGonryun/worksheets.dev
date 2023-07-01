import { protectedProcedure } from '../../../trpc';
import { z } from 'zod';
import { loadWorksheetLogs } from '@worksheets/feat/structured-logging';

// TODO: we only return the latest 100 logs, but we should paginate
export default protectedProcedure
  .input(
    z.object({
      worksheetId: z.string(),
      executionId: z.string().optional(),
    })
  )
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

    const massaged = logs.map((log) => ({
      ...log,
      message: JSON.stringify(log.message), // just in case clients insert bad data into message.
      data: JSON.stringify(log, null, 2),
    }));

    return massaged;
  });
