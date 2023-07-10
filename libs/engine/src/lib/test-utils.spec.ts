import { Library, MethodDefinition } from '@worksheets/apps/framework';
import { Logger } from './logger';
import { Controller, ExecutionFactory } from '..';
import { LogLevel } from '@worksheets/schemas-logging';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Mock = jest.Mock<any, any, any>;
export class JestApplicationLibrary implements Library {
  private readonly callMock: Mock;
  private readonly listMock: Mock;
  constructor(opts?: { call?: Mock; list?: Mock }) {
    this.callMock = opts?.call ?? jest.fn();
    this.listMock = opts?.list ?? jest.fn();
  }
  call(options: {
    path: string;
    input?: unknown;
    connection?: string;
  }): Promise<unknown> {
    if (options.input === undefined) {
      delete options.input;
    }
    if (options.connection === undefined) {
      delete options.connection;
    }
    return this.callMock(options);
  }
  list(): MethodDefinition[] {
    throw new Error('Method not implemented.');
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

export function newTestExecutionFactory(mock: jest.Mock) {
  const logger = new InMemoryLogger();
  const library = new JestApplicationLibrary({ call: mock });
  const controller = new Controller();
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
  return { factory, controller, logger };
}
