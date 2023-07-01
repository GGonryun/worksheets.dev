import {
  newTaskLoggingDatabase,
  newTaskSnapshotsDatabase,
  newTasksDatabase,
} from '@worksheets/data-access/tasks';
import { TaskLogger } from './util';
import { TRPCError } from '@trpc/server';

const taskDb = newTasksDatabase();
const loggingDb = newTaskLoggingDatabase();
const snapshotsDb = newTaskSnapshotsDatabase();

/**
 * @name cancelTask
 * @description sets task status to cancelled this does not immediately cancel the execution but it will prevent it from being requeued
 * @param {string} taskId the id of the task to cancel
 * @returns {Promise<TaskProcessableState>} a promise that resolves when the task has been cancelled
 * @throws {TRPCError} if the task could not be cancelled
 */
export const cancelTask = async (taskId: string): Promise<void> => {
  // check to make sure the task exists
  if (!(await taskDb.has(taskId))) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Task does not exist',
    });
  }
  // get the task from the database
  const task = await taskDb.get(taskId);
  // create a new logger
  const logger = new TaskLogger({ task, db: loggingDb });
  // and log that we are cancelling the task
  await logger.info('Cancelling task');
  // update the task status to cancelled
  await taskDb.update({ ...task, state: 'cancelled' });
  // delete snapshot for task
  await snapshotsDb.delete(taskId);
  // log that the task has been cancelled
  await logger.info('Task cancelled');
};
