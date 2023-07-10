import { LogLevel } from '@worksheets/schemas-logging';

/**
 * @name Logger
 * @description an interface for logging task execution
 * @export
 * @interface Logger
 * @example
 */
export interface Logger {
  /**
   * @name log
   * @description creates a new log entry for a task.
   * @param level the log level
   * @param message the message to log
   * @param data any additional data to log
   */
  log(level: LogLevel, message: string, data?: unknown): Promise<void>;

  /**
   * @name trace
   * @description creates a new trace log entry for a task.
   * @param message the message to log
   * @param data any additional data to log
   * @returns {Promise<void>} a promise that resolves when the log entry has been created
   */
  trace(message: string, data?: unknown): Promise<void>;
  /**
   * @name debug
   * @description creates a new debug log entry for a task.
   * @param message the message to log
   * @param data any additional data to log
   * @returns {Promise<void>} a promise that resolves when the log entry has been created
   */
  debug(message: string, data?: unknown): Promise<void>;
  /**
   * @name info
   * @description creates a new info log entry for a task.
   * @param message the message to log
   * @param data any additional data to log
   * @returns {Promise<void>} a promise that resolves when the log entry has been created
   */
  info(message: string, data?: unknown): Promise<void>;
  /**
   * @name warn
   * @description creates a new warn log entry for a task.
   * @param message the message to log
   * @param data any additional data to log
   * @returns {Promise<void>} a promise that resolves when the log entry has been created
   */
  warn(message: string, data?: unknown): Promise<void>;
  /**
   * @name error
   * @description creates a new error log entry for a task.
   * @param message the message to log
   * @param data any additional data to log
   * @returns {Promise<void>} a promise that resolves when the log entry has been created
   */
  error(message: string, data?: unknown): Promise<void>;
  /**
   * @name fatal
   * @description creates a new fatal log entry for a task.
   * @param message the message to log
   * @param data any additional data to log
   * @returns {Promise<void>} a promise that resolves when the log entry has been created
   */
  fatal(message: string, data?: unknown): Promise<void>;
}
