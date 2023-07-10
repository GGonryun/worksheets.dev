import { newTasksDatabase } from '@worksheets/data-access/tasks';
import { TaskEntity } from '@worksheets/schemas-executions';

const tasksDb = newTasksDatabase();

export const getProcessingHistory = async (
  worksheetId: string
): Promise<TaskEntity[]> => {
  const docs = await tasksDb.collection
    .where('worksheetId', '==', worksheetId)
    .orderBy('createdAt', 'desc')
    .get();
  const tasks = tasksDb.parse(docs);
  return tasks;
};
