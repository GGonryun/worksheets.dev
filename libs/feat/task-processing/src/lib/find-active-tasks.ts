import { TaskEntity, newTasksDatabase } from '@worksheets/data-access/tasks';

const db = newTasksDatabase();
export const findActiveTasks = async (
  worksheetId: string
): Promise<TaskEntity[]> => {
  const activeTasks = await db.query({
    f: 'worksheetId',
    o: '==',
    v: worksheetId,
  });

  return activeTasks.filter(
    (task) =>
      task.state === 'pending' ||
      task.state === 'queued' ||
      task.state === 'running'
  );
};
