import { newTaskLoggingDatabase } from '@worksheets/data-access/tasks';

const logsDb = newTaskLoggingDatabase();

type LoadWorksheetLogsRequest = {
  worksheetId: string;
  taskId?: string;
  limit: number;
  start?: number;
  end?: number;
};

export const loadWorksheetLogs = async ({
  worksheetId,
  taskId,
  limit = 100,
  start,
  end,
}: LoadWorksheetLogsRequest) => {
  let query = logsDb.collection.where('worksheetId', '==', worksheetId);
  if (taskId) {
    query = query.where('taskId', '==', taskId);
  }

  if (start) {
    query = query.where('createdAt', '>=', start);
  }

  if (end) {
    query = query.where('createdAt', '<=', end);
  }

  const data = await query.orderBy('createdAt', 'desc').limit(limit).get();
  const logs = logsDb.parse(data);
  return logs.map((log) => ({
    ...log,
    // just in case clients insert bad data into message.
    message: `${log.message}`,
    data: JSON.stringify(log, null, 2),
  }));
};
