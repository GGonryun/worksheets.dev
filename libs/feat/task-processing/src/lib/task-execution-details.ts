import { newTasksDatabase } from '@worksheets/data-access/tasks';
import { TaskEntity } from '@worksheets/schemas-executions';

const tasksDb = newTasksDatabase();

export const getTaskExecution = async (taskId: string): Promise<TaskEntity> => {
  return await tasksDb.get(taskId);
};
