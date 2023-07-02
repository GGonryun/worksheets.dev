import {
  TaskCompleteState,
  TaskEntity,
  TaskProcessableState,
  TaskState,
  newProcessTaskBus,
  newTaskCompleteBus,
  newTaskLoggingDatabase,
  newTaskSnapshotsDatabase,
  newTasksDatabase,
} from '@worksheets/data-access/tasks';
import { newWorksheetsDatabase } from '@worksheets/data-access/worksheets';
import {
  Controller,
  ExecutionFactory,
  ExecutionFailure,
  Snapshot,
} from '@worksheets/engine';
import { newPrivateLibrary } from '@worksheets/feat/execution-settings';
import {
  TaskLogger,
  isTaskProcessible,
  isTaskExpired,
  isTaskRequeueLimitReached,
  canExecutionBeRetried,
  didExecutionFail,
  newTaskController,
  convertFailureToTaskState,
  isTaskDelayed,
  isWithinNearPollingLimit,
} from './util';
import { durationRemaining, printDuration } from '@worksheets/util/time';
import { TRPCError } from '@trpc/server';
import { quotas } from '@worksheets/feat/user-management';
import { limits } from '@worksheets/feat/server-management';

const taskDb = newTasksDatabase();
const snapshotsDb = newTaskSnapshotsDatabase();
const loggingDb = newTaskLoggingDatabase();
const completeBus = newTaskCompleteBus();
const worksheetsdb = newWorksheetsDatabase();
const processorBus = newProcessTaskBus();

/**
 * @description process task takes in a task id and executes the task. a task may contain a partially processed execution in which case we will restart that execution and complete it. otherwise if the task is not in a processable state, it will return an error. if we are able to complete a task we will return the task's new state.
 * @param {string} taskId the id of the task to process
 * @returns {Promise<string>} the new state of the task
 * @throws {TRPCError} if the task is not in a processable state
 * @throws {TRPCError} if the task does not exist
 *
 * @example
 * const taskId = '1234';
 * const state = await processTask(taskId);
 * console.info(state);
 * // => 'processing'
 */
export const processTask = async (taskId: string): Promise<TaskState> => {
  // reduce the system processing limit
  if (
    await limits.isEmpty({
      id: 'task-processing-time',
      meta: 'server',
    })
  ) {
    throw new TRPCError({
      code: 'CONFLICT',
      message: 'Server is at maximum processing capacity. Please try again.',
    });
  }

  if (!(await taskDb.has(taskId))) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Task does not exist',
    });
  }

  // get the task from the database
  let task = await taskDb.get(taskId);

  // create a new logger
  const logger = new TaskLogger({ db: loggingDb, task });

  // if task has a delay and the delay is longer than cron polling limit allow out of band scheduler to take over
  if (isTaskDelayed(task) && !isWithinNearPollingLimit(task)) {
    await logger.info(
      `Task delayed. ${printDuration(durationRemaining(task.delay))}s remaining`
    );
    return 'queued';
  }

  // check if the task is in a processible state
  if (!isTaskProcessible(task)) {
    // save a new log entry if the task was not processible
    const message = 'Task is not in a processible state';
    await logger.error(message, { state: task.state });
    throw new TRPCError({
      code: 'CONFLICT',
      message,
    });
  }

  // start processing task
  await logger.info('Task picked up by processor');
  task = await taskDb.update({
    ...task,
    retries: task.retries + 1,
    state: 'running',
    updatedAt: Date.now(),
  });

  // check if the task expired
  if (isTaskExpired(task)) {
    // log that the task expired
    const message = 'Task expired';
    await logger.info(message);
    return await failTask(
      task,
      new ExecutionFailure({
        code: 'timeout',
        message,
      })
    );
  }

  // check if the task has breached it's maximum requeue count
  if (isTaskRequeueLimitReached(task)) {
    const message = "Task has reached it's maximum requeue count";
    await logger.warn(message);
    return await failTask(
      task,
      new ExecutionFailure({
        code: 'stack-overflow',
        message,
      })
    );
  }

  // check if worksheet still exists
  if (!(await worksheetsdb.has(task.worksheetId))) {
    const message = 'Worksheet does not exist';
    // if the worksheet does not exist, log that it does not exist
    await logger.error(message);
    return await failTask(
      task,
      new ExecutionFailure({
        code: 'not-found',
        message,
      })
    );
  }

  // check if snapshot exists
  if (!(await snapshotsDb.has(taskId))) {
    const message = 'Task snapshot does not exist';
    // if the snapshot does not exist, log that it does not exist
    await logger.error(message);
    return await failTask(
      task,
      new ExecutionFailure({
        code: 'not-found',
        message,
      })
    );
  }

  // load the task's snapshot from the database
  const snapshot = await snapshotsDb.get(taskId);
  // get the most recent copy of a worksheet from the database
  const worksheet = await worksheetsdb.get(task.worksheetId);
  // create a new library that uses the user id from the worksheet
  const library = newPrivateLibrary({
    userId: worksheet.uid,
    worksheetId: worksheet.id,
  });
  // create a new task controller
  const { controller, startController } = newTaskController(task);
  const factory = new ExecutionFactory({
    execution: {
      library,
      controller,
      logger,
    },
    stack: {
      max: 100,
    },
  });
  // create a new execution from the snapshot
  const execution = factory.deserialize(snapshot);

  // process the execution
  startController(); // TODO: make the execution responsible for starting the controller
  const result = await execution.process();

  // TODO: create a boundary for shared pre-processing that occures before the execution is rescheduled or terminated.
  // keep the duration of the execution in sync with the task for easier querying
  const duration = Number(
    (result.duration ?? 0) > 0 ? result.duration : 0.00001
  );
  task.duration = duration;

  await limits.throttle({
    id: 'task-processing-time',
    meta: 'server',
    quantity: duration / 1000,
  });

  if (
    !(await quotas.request({
      uid: worksheet.uid,
      type: 'processingTime',
      quantity: duration,
    }))
  ) {
    const message = 'User has reached maximum processing capacity.';
    await logger.error(message, { duration });
    // check to see if the user has enough processing time on their account to process the task
    return await failTask(
      task,
      new ExecutionFailure({
        code: 'insufficient-quota',
        message: message,
        data: {
          duration,
        },
      })
    );
  }

  if (didExecutionFail(controller)) {
    const failure = controller.getFailure();
    // if the execution failed, log that it failed
    await logger.error('Execution failed', { failure });
    // complete the task with a failure.
    return await failTask(task, failure);
  } else if (canExecutionBeRetried(controller)) {
    // if the execution can be retried, log that it can be retried
    await logger.info('Execution requires requeue');
    // serialize the execution snapshot
    const snapshot = factory.serialize(execution);
    return await requeueTask(task, controller, snapshot);
  } else {
    // if the execution completed, log that it completed
    await logger.info('Execution completed');
    return await completeTask(task, 'done', result.output);
  }
};

/**
 * @name failTask
 * @description fails a task by updating the task state depending on the failure type
 * @param {TaskEntity} task the task to fail
 * @param {TaskFailure} failure the failure to set on the task
 * @returns {Promise<TaskCompleteState>} a promise that resolves when the task has been completed with the new state
 */
export const failTask = async (
  task: TaskEntity,
  failure?: ExecutionFailure
): Promise<TaskCompleteState> => {
  if (!failure) {
    failure = new ExecutionFailure({
      code: 'unknown',
      message: 'Task failed without a failure object',
      data: { taskId: task.id },
    });
  }
  const newState = convertFailureToTaskState(failure);
  return await completeTask(task, newState, failure.serialize());
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
 * @param {TaskEntity} task the task to requeue
 * @param {Controller} controller the failure determines whether or not to start processing again or delay for a period of time
 * @param {Snapshot} snapshot the snapshot to update
 * @returns {Promise<string>} a promise that resolves when the task has been requeued
 */
export const requeueTask = async (
  task: TaskEntity,
  controller: Controller,
  snapshot: Snapshot
): Promise<TaskProcessableState> => {
  const state = 'queued';

  // get the delay from the controller failure
  const failure = controller.getFailure();

  // update the task state in the database
  await taskDb.update({
    ...task,
    state,
    updatedAt: Date.now(),
    delay: failure.delay,
  });

  // update the snapshot state in the database
  await snapshotsDb.update({
    ...snapshot,
    id: task.id,
  });

  await processorBus.publish({ taskId: task.id });

  return 'queued';
};
