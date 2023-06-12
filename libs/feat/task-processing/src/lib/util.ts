import {
  LogLevel,
  TaskEntity,
  TaskLoggingDatabase,
  TasksDatabase,
} from '@worksheets/data-access/tasks';
import {
  AlarmController,
  CompositeController,
  Controller,
  ExecutionFailure,
  HourglassController,
  Logger,
  Register,
} from '@worksheets/engine';
import { isDataVolumeTooLargeForFirestore } from '@worksheets/util/data-structures';
import { addMinutesToCurrentTime } from '@worksheets/util/time';
import { Maybe } from '@worksheets/util/types';
import { cleanseObject } from '@worksheets/util/objects';
import { TaskDeadlines } from '@worksheets/data-access/tasks';

/**
 * @name newDefaultDeadlines
 * @description safelySaveTask saves a task to the database. if the task is too large to save, it will throw an error.
 * @returns {TaskDeadlines} the default deadlines
 * @remarks 10 minutes for global timeout
 * @remarks 30 seconds max processor runtime because vercel has a 60 second timeout, this should give us enough time to for pre-processing and post-processing
 * @remarks 10 seconds for method call timeout because we don't want to wait too long for a method to execute it could cause the entire execution to fail
 * @remarks 10 requeues to prevent infinite requeues
 */
export function newDefaultDeadlines(): TaskDeadlines {
  return {
    'task-expiration': addMinutesToCurrentTime(10).getTime(),
    'max-processor-runtime': 30 * 1000, // seconds
    'method-call-timeout': 10 * 1000, // seconds
    'task-requeue-limit': 10 * 1000, // seconds
  };
}

/**
 * @name safelyGetTask
 * @description checks to see if a task exists in the database.
 * @param db the database to check
 * @param taskId the id of the task to check
 * @returns {Promise<Maybe<TaskEntity>>} the task if it exists, otherwise undefined
 */
export const safelyGetTask = async (
  db: TasksDatabase,
  taskId?: string
): Promise<Maybe<TaskEntity>> => {
  if (!taskId) return undefined;

  if (await db.has(taskId)) {
    return await db.get(taskId);
  }
  return undefined;
};

/**
 * @name isExecutionCancelled
 * @description checks to see if an execution has been cancelled.
 * @returns {boolean} true if the execution has completed, otherwise false
 */
export const isExecutionCancelled = (controller: Controller): boolean => {
  return Boolean(controller.isCancelled());
};

/**
 * @name isTaskProcessible
 * @description isTaskProcessible checks to see if a task is in a processible state. if the task is in a processible state it will return true, otherwise it will return false.
 * @param {TaskEntity} task the task to check
 * @returns {boolean} true if the task is in a processible state, otherwise false
 *
 * @example
 * const task = { id: '1234', state: 'queued' };
 * const isProcessible = isTaskProcessible(task);
 * console.log(isProcessible);
 * // => true
 */
export const isTaskProcessible = (task: TaskEntity): boolean => {
  return task.state === 'queued';
};

export type TaskLoggerOptions = {
  db: TaskLoggingDatabase;
  task: TaskEntity;
};
/**
 * @description creates a new logger bound to a task
 * @constructor takes in a task id and returns a new logger for that task
 * @param {string} taskId the id of the task to bind the logger to
 *
 * @example
 * const taskId = '1234';
 * const logger = newLogger(taskId);
 *
 * logger.trace('Task is about to be processed');
 * logger.debug('Task is processing');
 * logger.info('Task is processing');
 * logger.warn('Task is taking a long time to process');
 * logger.error('Task failed to process');
 * logger.fatal('Task failed to process');
 * // => void
 */
export class TaskLogger implements Logger {
  private readonly db: TaskLoggingDatabase;
  private readonly task: TaskEntity;
  constructor({ db, task }: TaskLoggerOptions) {
    this.db = db;
    this.task = task;
  }

  trace(message: string, data?: unknown): Promise<void> {
    console.debug(`Task ${this.task.id}: ${message}`, data);
    return this.log('trace', message, data);
  }

  debug(message: string, data?: unknown): Promise<void> {
    console.debug(`Task ${this.task.id}: ${message}`, data);
    return this.log('debug', message, data);
  }

  info(message: string, data?: unknown): Promise<void> {
    console.info(`Task ${this.task.id}: ${message}`, data);
    return this.log('info', message, data);
  }

  warn(message: string, data?: unknown): Promise<void> {
    console.warn(`Task ${this.task.id}: ${message}`, data);
    return this.log('warn', message, data);
  }

  error(message: string, data?: unknown): Promise<void> {
    console.error(`Task ${this.task.id}: ${message}`, data);
    return this.log('error', message, data);
  }

  fatal(message: string, data?: unknown): Promise<void> {
    console.error(`Task ${this.task.id}: ${message}`, data);
    return this.log('fatal', message, data);
  }

  /**
   * @name newLogEntry
   * @description creates a new log entry for a task.
   * @param {LogLevel} level the level of the log entry
   * @param {string} message the message to log
   * @returns {Promise<void>} a promise that resolves when the log entry has been created
   *
   */
  async log(level: LogLevel, message: string, data: unknown): Promise<void> {
    // check to make sure the size of the data does not exceed the maximum size
    if (isDataVolumeTooLargeForFirestore(data, 10)) {
      // if the data is too large, we will log a warning and truncate the data
      data = 'Data too large to log';
    }

    // create a new log entry in the database
    await this.db.insert({
      id: this.db.id(),
      taskId: this.task.id,
      message,
      level,
      data: cleanseObject(data),
      createdAt: Date.now(),
    });
  }
}

/**
 * @name isTaskExpired
 * @description checks to see if a task has breached the execution deadline. if the task has exceeded it's deadline it will return true, otherwise it will return false.
 * @param {TaskEntity} task the task to check
 * @returns {boolean} true if the task has exceeded it's SLA's, otherwise false
 * @throws {HandlerFailure} if the task does not have a deadline set
 *
 * @example
 * const task = { id: '1234', state: 'queued', deadline: Date.now() - 1000 };
 * const hasExceededDeadline = hasTaskExceededDeadline(task);
 * console.log(hasExceededDeadline);
 * // => true
 */
export const isTaskExpired = (task: TaskEntity): boolean => {
  // deadline is equal to the task deadlines global-timeout property
  let deadline = task.deadlines['task-expiration'];
  // defaults to 5 minutes from now if a deadline isn't set
  if (!deadline) {
    deadline = addMinutesToCurrentTime(5).getTime();
  }
  // check if the deadline has expired
  return deadline < Date.now();
};

/**
 * @name didExecutionFail
 * @description checks the register of an execution to see if a failure has been set
 * @param {Controller} controller the controller to check
 * @param {Register} register the register to check
 * @returns {boolean} true if the register has a failure set, otherwise false
 */
export const didExecutionFail = (
  controller: Controller,
  register: Register
): boolean => {
  if (controller.hasFailure()) {
    const failure = controller.getFailure();
    if (
      !(failure instanceof ExecutionFailure) ||
      failure.code !== 'cancelled'
    ) {
      return true;
    }
  }
  return register.failure !== undefined;
};

/**
 * @name isTaskRequeueLimitReached
 * @description checks to see if a task has exceeded it's requeue limit.
 * @param {TaskEntity} task the task to check
 * @returns {boolean} true if the task has exceeded it's requeue limit, otherwise false
 */
export const isTaskRequeueLimitReached = (task: TaskEntity): boolean => {
  return task.retries >= task.deadlines['task-requeue-limit'];
};

/**
 * @name newTaskController
 * @description this controller is bound to the task and will force executions to cancel if they exceed their deadlines
 * @param {TaskEntity} task the task to create the controller for
 * @returns {Controller} the hourglass controller for the task
 */

export const newTaskController = (
  task: TaskEntity
): { startController: () => void; controller: Controller } => {
  // get the tasks expiration date
  const expiration = task.deadlines['task-expiration'];
  // get the tasks max processor lifetime
  const runtime = task.deadlines['max-processor-runtime'];
  // the hourglass will go off if the task exceeds it's max processor runtime
  const hourglass = new HourglassController(runtime);
  // this alarm will go off if the task expires during execution.
  const alarm = new AlarmController(expiration);
  // create a composite controller for the hourglass and alarm
  const composite = new CompositeController();
  composite.register(hourglass);
  composite.register(alarm);

  // return the composite controller
  return {
    startController: () => {
      hourglass.start();
      alarm.start();
    },
    controller: composite,
  };
};
