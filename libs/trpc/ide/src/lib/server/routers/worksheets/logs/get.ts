import { protectedProcedure } from '../../../trpc';
import { z } from 'zod';
import { loadWorksheetLogs } from '@worksheets/feat/structured-logging';
import {
  addMinutesToCurrentTime,
  dateFromTimestamp,
  formatTimestamp,
} from '@worksheets/util/time';

export default protectedProcedure
  .input(
    z.object({
      worksheetId: z.string(),
      startTime: z.number().optional(),
      endTime: z
        .number()
        .optional()
        .describe('if unspecified, defaults to 1 hour from start time'),
    })
  )
  .query(async ({ input: { worksheetId, startTime, endTime } }) => {
    console.info(
      `getting worksheet logs for worksheet ${worksheetId} between start ${formatTimestamp(
        startTime
      )} and ${formatTimestamp(endTime)}`
    );
    startTime = startTime ?? Date.now();
    endTime =
      endTime ??
      addMinutesToCurrentTime(-60, dateFromTimestamp(startTime)).getTime();
    const logs = await loadWorksheetLogs({
      worksheetId,
      startTime,
      endTime,
    });
    return { startTime, endTime, logs };
  });
