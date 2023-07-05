import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';
import { newTaskLoggingDatabase } from '@worksheets/data-access/tasks';
import { addMinutesToCurrentTime } from '@worksheets/util/time';

const logs = newTaskLoggingDatabase();

export const reapExecutionLogs = async (max: number): Promise<number> => {
  const data = await logs.collection
    .where(
      'createdAt',
      '<=',
      addMinutesToCurrentTime(
        SERVER_SETTINGS.REAPER.FREQUENCIES.DELETE_EXECUTION_LOGS
      ).getTime()
    )
    .limit(max)
    .get();

  // if there are no logs to process, return 0
  if (data.empty) {
    console.info(
      '[REAPER][EXECUTION-LOGS] Shutting down. No available execution logs to reap.'
    );
    return 0;
  }

  const offset = SERVER_SETTINGS.FIRESTORE.BATCH_SIZE;
  const promises = [];
  for (let i = 0; i < data.docs.length; i += offset) {
    const batch = logs.batch();
    for (let j = i; j < Math.min(i + offset, data.docs.length); j++) {
      batch.delete(data.docs[j].ref);
    }
    promises.push(batch.commit());
  }
  // parse the data into entities
  await Promise.all(promises);

  console.info(
    `[REAPER][EXECUTION-LOGS] Deleted ${data.docs.length} expired execution logs across ${promises.length} batches.`
  );
  return data.docs.length;
};
