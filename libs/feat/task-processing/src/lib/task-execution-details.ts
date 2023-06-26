import { TaskEntity, newTasksDatabase } from '@worksheets/data-access/tasks';

const tasksDb = newTasksDatabase();

export const getTaskExecution = async (taskId: string): Promise<TaskEntity> => {
  return await tasksDb.get(taskId);
};
