import { Library } from '@worksheets/apps/framework';
import { Heap, Stack } from '@worksheets/util/data-structures';
import { Engine } from './engine';
import { ScriptEvaluator, ScriptsApplicationBridge } from './evaluator';
import { ExecutionFailure } from './failures';
import { Context, Instruction, Register } from './framework';
import { z } from 'zod';
import { Logger } from './logger';
import { Controller } from './controller';

export type ExecutionOptions = {
  memory: Heap;
  register: Register;
  instructions: Stack<Instruction>;
  library: Library;
  logger: Logger;
  controller: Controller;
};

export const executionDimensionsSchema = z.object({
  mass: z.number(), // heap size
  width: z.number(), // total number of instructions.
  height: z.number(), // stack size.
  depth: z.number(), // duration.
});

export type ExecutionDimensions = z.infer<typeof executionDimensionsSchema>;

export class Execution {
  public readonly ctx: Context;
  public readonly engine: Engine;

  // if i took in a controller as a parameter, i can bind the controller to the execution. here i can have a reference to the controller and i can call the controller to stop the execution.

  constructor(opts: ExecutionOptions) {
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
    const { controller, logger, register } = this.ctx;
    await logger.info(`Starting execution`);
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
        return register;
      }
    }

    return register;
  }
}
