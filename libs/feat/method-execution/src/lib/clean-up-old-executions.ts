import { newMethodExecutionsDatabase } from '@worksheets/data-access/method-executions';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';
import { addMinutesToCurrentTime } from '@worksheets/util/time';

const db = newMethodExecutionsDatabase();

export const reapOldExecutions = async (max: number): Promise<number> => {
  const data = await db.collection
    // get all tasks that might be ready to process
    .where(
      'finishedAt',
      '<',
      addMinutesToCurrentTime(
        SERVER_SETTINGS.REAPER.FREQUENCIES.DELETE_EXECUTION_HISTORY
      )
    )

    // limit the number of tasks to process
    .limit(max)
    // get the data
    .get();

  // if there are no tasks to process, return 0
  if (data.empty) {
    console.info(
      '[REAPER][EXECUTION-HISTORY] Shutting down. No available execution histories to reap.'
    );
    return 0;
  }

  const offset = SERVER_SETTINGS.FIRESTORE.BATCH_SIZE;
  const promises = [];
  for (let i = 0; i < data.docs.length; i += offset) {
    const batch = db.batch();
    for (let j = i; j < Math.min(i + offset, data.docs.length); j++) {
      batch.delete(data.docs[j].ref);
    }
    promises.push(batch.commit());
  }
  // parse the data into entities
  await Promise.all(promises);

  console.info(
    `[REAPER][EXECUTION-HISTORY] Deleted ${data.docs.length} expired executions across ${promises.length} batches.`
  );

  return data.docs.length;
};
