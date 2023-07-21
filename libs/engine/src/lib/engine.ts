import { Context, Instruction, MethodCallFailure } from './framework';
import { Catch } from './instructions/catch';
import { ExecutionFailure } from './failures';
import { Retry } from './instructions/retry';
import { Finally } from './instructions/finally';

export class Engine {
  constructor(private readonly ctx: Context) {}

  async iterate(): Promise<Instruction | undefined> {
    const ctx = this.ctx;

    const instruction = ctx.instructions.pop();
    if (!instruction) {
      return; // done
    }

    if (this.cannotHandleFailure(instruction)) {
      return instruction;
    }

    try {
      await instruction.process(ctx);
    } catch (error) {
      if (error instanceof MethodCallFailure) {
        // handlable errors get moved into the register for the next instruction to handle because the controller would terminate the entire execution.
        ctx.register.failure = error;
      } else if (error instanceof ExecutionFailure) {
        const message = `${error.message}`;
        ctx.logger.error(message, error);
        ctx.controller.cancel(error);
      } else {
        const message = `Unknown failure occured during execution`;
        ctx.logger.error(message, error);
        ctx.controller.cancel(
          new ExecutionFailure({
            code: 'internal-error',
            message,
            cause: error,
          })
        );
      }
    }
    return instruction;
  }

  private cannotHandleFailure(instruction: Instruction) {
    return (
      this.hasProcessableFailure() &&
      !(instruction instanceof Catch) &&
      !(instruction instanceof Retry && !(instruction instanceof Finally))
    );
  }

  hasProcessableFailure(): boolean {
    return Boolean(this.ctx.register.failure);
  }

  hasNext(): boolean {
    return Boolean(this.ctx.instructions.peek());
  }

  peek(): Instruction | undefined {
    return this.ctx.instructions.peek();
  }
}
