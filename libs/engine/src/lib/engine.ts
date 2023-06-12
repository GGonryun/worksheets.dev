import { MethodCallFailure } from '@worksheets/apps/framework';
import { Context, Instruction } from './framework';
import { Catch } from './instructions/catch';
import { ExecutionFailure } from './failures';

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
      } else {
        const message = `Failed to process instruction`;
        ctx.logger.error(message, { raw: JSON.stringify(error) });
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
    return this.hasProcessableFailure() && !(instruction instanceof Catch);
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
