// TOOD: new logging instruction that saves something to the system log.
import { LogLevel } from '@worksheets/data-access/tasks';
import { ExecutionFailure } from '../failures';
import { Context, Instruction } from '../framework';

export type LogDefinition = {
  log: string | { message: string; data: unknown; level: LogLevel };
};
export class Log implements Instruction {
  readonly type = 'log';
  readonly definition: LogDefinition;
  constructor(def: LogDefinition) {
    this.definition = def;
  }
  async process(ctx: Context): Promise<void> {
    const { logger, scripts } = ctx;
    // check if the log definition is of type string if so use the logger to send an info log message
    if (typeof this.definition.log === 'string') {
      const data = await scripts.recursiveParse(this.definition.log);
      logger.info(`${data}`);
      return;
    }

    // check if the log definition is of type object if so use the logger to send a log message with the specified level
    if (typeof this.definition.log === 'object' && this.definition.log) {
      logger.log(
        this.definition.log.level,
        await scripts.recursiveParse(this.definition.log.message),
        await scripts.recursiveParse(this.definition.log.data)
      );
      return;
    }

    // throw an error if the input wasnt a string or object
    throw new ExecutionFailure({
      code: 'invalid-definition',
      message: `Log instruction has invalid syntax.`,
      data: { ...this.definition },
    });
  }
}
