import { newTaskLoggingDatabase } from '@worksheets/data-access/tasks';

const logsDb = newTaskLoggingDatabase();

type LoadWorksheetLogsRequest = {
  worksheetId: string;
  taskId?: string;
};

export const loadWorksheetLogs = async ({
  worksheetId,
  taskId,
}: LoadWorksheetLogsRequest) => {
  let query = logsDb.collection.where('worksheetId', '==', worksheetId);
  if (taskId) {
    query = query.where('taskId', '==', taskId);
  }

  const data = await query.orderBy('createdAt', 'desc').limit(100).get();
  return logsDb.parse(data);
};
