import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';
import {
  newProcessTaskBus,
  newTaskLoggingDatabase,
  newTaskSnapshotsDatabase,
  newTasksDatabase,
} from '@worksheets/data-access/tasks';
import { addMinutesToCurrentTime } from '@worksheets/util/time';

const tasks = newTasksDatabase();
const snapshots = newTaskSnapshotsDatabase();
const logs = newTaskLoggingDatabase();

export const reapExecutionHistory = async (max: number): Promise<number> => {
  const data = await tasks.collection
    // get all tasks that might be ready to process
    .where('state', 'not-in', ['queued', 'pending', 'running'])
    .where(
      'updatedAt',
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

  // parse the data into entities
  const entities = tasks.parse(data);

  let logsDeleted = 0;
  let snapshotsDeleted = 0;
  for (const entity of entities) {
    const deletableLogs = await logs.query({
      f: 'taskId',
      o: '==',
      v: entity.id,
    });

    for (const deletableLog of deletableLogs) {
      logsDeleted++;
      await logs.delete(deletableLog.id);
    }

    if (await snapshots.has(entity.id)) {
      snapshotsDeleted++;
      await snapshots.delete(entity.id);
    }
  }

  console.info(
    `[REAPER][EXECUTION-HISTORY] Deleted ${entities.length} execution tasks, ${logsDeleted} logs, and ${snapshotsDeleted} snapshots`
  );
  return entities.length;
};
