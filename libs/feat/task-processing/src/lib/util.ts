import {
  LogLevel,
  TaskEntity,
  TaskLoggingDatabase,
  TasksDatabase,
} from '@worksheets/data-access/tasks';
import { Register } from '@worksheets/engine';
import { isDataVolumeTooLargeForFirestore } from '@worksheets/util/data-structures';
import { addMinutesToCurrentTime } from '@worksheets/util/time';
import { Maybe } from '@worksheets/util/types';

import { TaskDeadlines } from '@worksheets/data-access/tasks';

/**
 * @name newDefaultDeadlines
 * @description safelySaveTask saves a task to the database. if the task is too large to save, it will throw an error.
 * @returns {TaskDeadlines} the default deadlines
 * @remarks 5 minutes for global timeout, 30 seconds for method call timeout
 */
export function newDefaultDeadlines(): TaskDeadlines {
  return {
    'max-task-lifetime': addMinutesToCurrentTime(5).getTime(),
    'max-processor-runtime': 30,
    'method-call-timeout': 10,
    'task-requeue-limit': 5,
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
 * @name didExecutionHalt
 * @description checks to see if an execution has halted.
 * @param {Register} register the register to check
 * @returns {boolean} true if the execution has completed, otherwise false
 */
export const didExecutionHalt = (register: Register): boolean => {
  return Boolean(register.halt);
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
  taskId: string;
};
/**
 * @todo create a logger interface in the engine, then implement that interface here then take this logger and pass it into the execution so that we can track the engine's progress
 * @description creates a new logger bound to a task
 * @constructor takes in a task id and returns a new logger for that task
 * @param {string} taskId the id of the task to bind the logger to
 * @returns {Logger} a new logger bound to the task
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
export class TaskLogger {
  private readonly db: TaskLoggingDatabase;
  private readonly taskId: string;
  constructor({ db, taskId }: TaskLoggerOptions) {
    this.db = db;
    this.taskId = taskId;
  }

  /**
   * @name trace
   * @description creates a new trace log entry for a task.
   * @param message the message to log
   * @param data any additional data to log
   * @returns {Promise<void>} a promise that resolves when the log entry has been created
   */
  trace(message: string, data?: unknown): Promise<void> {
    return this.newLogEntry('trace', message, data);
  }
  /**
   * @name debug
   * @description creates a new debug log entry for a task.
   * @param message the message to log
   * @param data any additional data to log
   * @returns {Promise<void>} a promise that resolves when the log entry has been created
   */
  debug(message: string, data?: unknown): Promise<void> {
    return this.newLogEntry('debug', message, data);
  }

  /**
   * @name info
   * @description creates a new info log entry for a task.
   * @param message the message to log
   * @param data any additional data to log
   * @returns {Promise<void>} a promise that resolves when the log entry has been created
   */
  info(message: string, data?: unknown): Promise<void> {
    return this.newLogEntry('info', message, data);
  }

  /**
   * @name warn
   * @description creates a new warn log entry for a task.
   * @param message the message to log
   * @param data any additional data to log
   * @returns {Promise<void>} a promise that resolves when the log entry has been created
   */
  warn(message: string, data?: unknown): Promise<void> {
    return this.newLogEntry('warn', message, data);
  }

  /**
   * @name error
   * @description creates a new error log entry for a task.
   * @param message the message to log
   * @param data any additional data to log
   * @returns {Promise<void>} a promise that resolves when the log entry has been created
   */
  error(message: string, data?: unknown): Promise<void> {
    return this.newLogEntry('error', message, data);
  }

  /**
   * @name newLogEntry
   * @description creates a new log entry for a task.
   * @param {LogLevel} level the level of the log entry
   * @param {string} message the message to log
   * @returns {Promise<void>} a promise that resolves when the log entry has been created
   *
   */
  async newLogEntry(
    level: LogLevel,
    message: string,
    data: unknown
  ): Promise<void> {
    // check to make sure the size of the data does not exceed the maximum size
    if (isDataVolumeTooLargeForFirestore(data, 10)) {
      // if the data is too large, we will log a warning and truncate the data
      data = 'Data too large to log';
    }

    // create a new log entry in the database
    await this.db.insert({
      id: this.db.id(),
      taskId: this.taskId,
      message,
      level,
      data,
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
  let deadline = task.deadlines['max-task-lifetime'];
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
 * @param {Register} register the register to check
 * @returns {boolean} true if the register has a failure set, otherwise false
 */
export const didExecutionFail = (register: Register): boolean => {
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
