import { TaskEntity, newTasksDatabase } from '@worksheets/data-access/tasks';

const tasksDb = newTasksDatabase();

export const getProcessingHistory = async (
  worksheetId: string
): Promise<TaskEntity[]> => {
  const tasks = await tasksDb.query({
    f: 'worksheetId',
    o: '==',
    v: worksheetId,
  });
  return tasks;
};
