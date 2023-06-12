import { Library, MethodDefinition } from '@worksheets/apps/framework';
import { Logger } from './logger';
import { LogLevel } from '@worksheets/data-access/tasks';
import { Controller, ExecutionFactory } from '..';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Mock = jest.Mock<any, any, any>;
export class JestApplicationLibrary implements Library {
  private readonly callMock: Mock;
  private readonly listMock: Mock;
  constructor(opts?: { call?: Mock; list?: Mock }) {
    this.callMock = opts?.call ?? jest.fn();
    this.listMock = opts?.list ?? jest.fn();
  }
  list(): MethodDefinition[] {
    throw new Error('Method not implemented.');
  }

  async call(path: string, ...inputs: unknown[]): Promise<unknown> {
    return this.callMock(path, ...inputs);
  }

  mocks() {
    return { call: this.callMock, list: this.listMock };
  }
}

describe('test-utils shared', () => {
  it('ok', () => {
    // silence the warning that every suite needs one test
  });
});

type LogMessage = {
  level: LogLevel;
  message: string;
  data?: unknown;
};

/**
 * @name CollectionLogger
 * @description a logger that logs messages into a list
 * @implements {Logger}
 *
 */
export class InMemoryLogger implements Logger {
  // a place to save received logs
  private readonly logs: LogMessage[] = [];

  /**
   * Searches for a log in memory
   */
  findLog(level: LogLevel, message: string): LogMessage | undefined {
    return this.logs.find(
      (log) => log.level === level && log.message === message
    );
  }

  async log(
    level: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal',
    message: string,
    data?: unknown
  ): Promise<void> {
    // save the log in memory
    this.logs.push({ level, message, data });
  }
  async trace(message: string, data?: unknown): Promise<void> {
    this.logs.push({ level: 'trace', message, data });
  }
  async debug(message: string, data?: unknown): Promise<void> {
    this.logs.push({ level: 'debug', message, data });
  }
  async info(message: string, data?: unknown): Promise<void> {
    this.logs.push({ level: 'info', message, data });
  }
  async warn(message: string, data?: unknown): Promise<void> {
    this.logs.push({ level: 'warn', message, data });
  }
  async error(message: string, data?: unknown): Promise<void> {
    this.logs.push({ level: 'error', message, data });
  }
  async fatal(message: string, data?: unknown): Promise<void> {
    this.logs.push({ level: 'fatal', message, data });
  }
}

export function newTestExecutionFactory(mock: jest.Mock = jest.fn()) {
  const logger = new InMemoryLogger();
  const library = new JestApplicationLibrary({ call: mock });
  const controller = new Controller();
  const factory = new ExecutionFactory({
    library,
    controller,
    logger,
  });
  return { factory, controller, logger };
}
