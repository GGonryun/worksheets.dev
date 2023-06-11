import {
  TaskCompleteState,
  TaskEntity,
  TaskProcessableState,
  TaskState,
  newTaskCompleteBus,
  newTaskLoggingDatabase,
  newTaskSnapshotsDatabase,
  newTasksDatabase,
} from '@worksheets/data-access/tasks';
import { newWorksheetsDatabase } from '@worksheets/data-access/worksheets';
import { ExecutionFactory, Snapshot } from '@worksheets/engine';
import { newPrivateLibrary } from '@worksheets/feat/execution-settings';
import { HandlerFailure } from '@worksheets/util/next';
import {
  TaskLogger,
  isTaskProcessible,
  isTaskExpired,
  isTaskRequeueLimitReached,
  didExecutionHalt,
  didExecutionFail,
} from './util';

const taskDb = newTasksDatabase();
const snapshotsDb = newTaskSnapshotsDatabase();
const loggingDb = newTaskLoggingDatabase();
const completeBus = newTaskCompleteBus();
const worksheetsdb = newWorksheetsDatabase();

/**
 * @description process task takes in a task id and executes the task. a task may contain a partially processed execution in which case we will restart that execution and complete it. otherwise if the task is not in a processable state, it will return an error. if we are able to complete a task we will return the task's new state.
 * @param {string} taskId the id of the task to process
 * @returns {Promise<string>} the new state of the task
 * @throws {HandlerFailure} if the task is not in a processable state
 * @throws {HandlerFailure} if the task does not exist
 *
 * @example
 * const taskId = '1234';
 * const state = await processTask(taskId);
 * console.log(state);
 * // => 'processing'
 */
export const processTask = async (taskId: string): Promise<TaskState> => {
  if (!(await taskDb.has(taskId))) {
    throw new HandlerFailure({
      code: 'not-found',
      message: 'Task does not exist',
      data: { taskId },
    });
  }

  // get the task from the database
  const task = await taskDb.get(taskId);

  // create a new logger
  const logger = new TaskLogger({ db: loggingDb, taskId });

  // log that we are processing the task
  await logger.info('Processing task');

  // check if the task is in a processible state
  if (!isTaskProcessible(task)) {
    // save a new log entry if the task was not processible
    const message = 'Task is not in a processible state';
    await logger.error(message, { state: task.state });
    throw new HandlerFailure({
      code: 'conflict',
      message,
      data: { taskId, state: task.state },
    });
  }

  // check if the task expired
  if (isTaskExpired(task)) {
    // log that the task expired
    await logger.info('Task expired');
    return await completeTask(task, 'expired');
  }

  // check if the task has breached it's maximum requeue count
  if (isTaskRequeueLimitReached(task)) {
    // log that the task has reached it's maximum requeue count
    await logger.info("Task has reached it's maximum requeue count");
    return await completeTask(task, 'cancelled');
  }

  // check if worksheet still exists
  if (!(await worksheetsdb.has(task.worksheetId))) {
    // if the worksheet does not exist, log that it does not exist
    await logger.error('Worksheet does not exist');
    return await completeTask(task, 'cancelled');
  }

  // check if snapshot exists
  if (!(await snapshotsDb.has(taskId))) {
    // if the snapshot does not exist, log that it does not exist
    await logger.error('Task snapshot does not exist');
    return await completeTask(task, 'cancelled');
  }

  // load the task's snapshot from the database
  const snapshot = await snapshotsDb.get(taskId);
  // get the most recent copy of a worksheet from the database
  const worksheet = await worksheetsdb.get(task.worksheetId);
  // create a new library that uses the user id from the worksheet
  const library = newPrivateLibrary(worksheet.uid);
  // TODO: pass in the logger to the execution factory
  const factory = new ExecutionFactory({ library });
  // create a new execution from the snapshot
  const execution = factory.deserialize(snapshot);
  // process the execution
  const result = await execution.process();
  // check if the execution completed
  if (didExecutionHalt(result)) {
    // if the execution halted, log that it halted
    await logger.info('Execution halted');
    // serialize the execution snapshot
    const snapshot = factory.serialize(execution);
    return await requeueTask(task, snapshot);
  }
  if (didExecutionFail(result)) {
    // if the execution failed, log that it failed
    await logger.error('Execution failed', {
      failure: result.failure?.toSimple(),
    });
    // complete teh task with a failure.
    return await completeTask(task, 'failed', result.failure?.toSimple());
  } else {
    // if the execution completed, log that it completed
    await logger.info('Execution completed');
    return await completeTask(task, 'done', result.output);
  }
};

/**
 * @name completeTask
 * @description completes a task by updating the task state to the
 * @param {TaskEntity} task the task to complete
 * @param {TaskCompleteState} state the state to set on the task
 * @param {unknown} output the output to set on the task
 * @returns {Promise<TaskCompleteState>} a promise that resolves when the task has been completed with the new state
 */
export const completeTask = async (
  task: TaskEntity,
  state: TaskCompleteState,
  output?: unknown
): Promise<TaskCompleteState> => {
  // update the task state in the database
  await taskDb.update({
    ...task,
    state,
    output,
    updatedAt: Date.now(),
  });
  // cleanup the snapshot
  await snapshotsDb.delete(task.id);
  // publish a task completed event
  await completeBus.publish({ taskId: task.id, state });

  return state;
};

/**
 * @name requeue
 * @description requeues a task by updating the task state to 'requeued' and updating the snapshot in memory
 * @param {TaskLogger} logger the logger to use
 * @param {TaskEntity} task the task to requeue
 * @param {Snapshot} snapshot the snapshot to update
 * @returns {Promise<string>} a promise that resolves when the task has been requeued
 */
export const requeueTask = async (
  task: TaskEntity,
  snapshot: Snapshot
): Promise<TaskProcessableState> => {
  const state = 'queued';

  // update the task state in the database
  await taskDb.update({ ...task, state, updatedAt: Date.now() });
  // update the snapshot state in the database
  await snapshotsDb.update({
    ...snapshot,
    updatedAt: Date.now(),
    id: task.id,
  });

  return 'queued';
};
