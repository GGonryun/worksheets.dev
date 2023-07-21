import { Engine } from './engine';
import { ScriptEvaluator, ScriptsApplicationBridge } from './evaluator';
import { ExecutionFailure } from './failures';
import {
  Context,
  Instructions,
  Library,
  Memory,
  References,
  Register,
} from './framework';
import { Logger } from './logger';
import { Controller } from './controller';

export type ExecutionOptions = {
  memory: Memory;
  references: References;
  register: Register;
  instructions: Instructions;
  library: Library;
  logger: Logger;
  controller: Controller;
};

export class Execution {
  public readonly ctx: Context;
  public readonly engine: Engine;

  constructor(opts: ExecutionOptions) {
    const references = opts.references;
    const library = opts.library;
    const register = opts.register;
    const instructions = opts.instructions;
    const memory = opts.memory;
    const logger = opts.logger;
    const controller = opts.controller;

    const scripts = new ScriptEvaluator(
      memory,
      new ScriptsApplicationBridge(library)
    );

    this.ctx = new Context({
      references,
      memory,
      register,
      instructions,
      scripts,
      library,
      logger,
      controller,
    });

    this.engine = new Engine(this.ctx);
  }

  async process() {
    const start = Date.now();

    const { controller, logger, register } = this.ctx;
    while (!controller.isCancelled() && this.engine.hasNext()) {
      try {
        await this.engine.iterate();
      } catch (error) {
        const message = `Failed to iterate engine steps`;
        logger.error(message, error);
        controller.cancel(
          new ExecutionFailure({
            code: 'internal-error',
            message,
            cause: error,
          })
        );
        // return register; // TODO: should we return register here?
      }
    }

    // if the register has an error pass it into the controller as an unhandled error
    if (register.failure && !controller.isCancelled()) {
      controller.cancel(
        new ExecutionFailure({
          code: 'method-failure',
          message: register.failure.message,
          cause: register.failure,
        })
      );
    }

    // add to total processing time.
    register.duration = (register.duration ?? 0) + Date.now() - start;
    return register;
  }
}
