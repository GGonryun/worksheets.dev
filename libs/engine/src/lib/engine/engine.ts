import { Failure } from '@worksheets/util-errors';
import { ExecutionFailure } from '../failures';
import { Catch } from '../instructions/catch';
import { Context, Instruction } from '../framework';

export class Engine {
  private readonly context: Context;
  constructor(ctx: Context = new Context()) {
    this.context = ctx;
  }

  // todo: what we want is to trigger effects before/after which is a lot like a state machine.
  // if we can convert the engine into a state machine we can add beforeState and afterState triggers.
  // and then organize a clearer picture of the order of events
  async iterate(): Promise<Instruction | undefined> {
    const instruction = this.context.instructions.pop();
    if (!instruction) {
      return;
    }
    if (this.canCatchError(instruction)) {
      return instruction;
    }

    try {
      await instruction.process(this.context);
    } catch (error) {
      const e =
        error instanceof ExecutionFailure
          ? error
          : new Failure({
              cause: error,
              message:
                'unexpected failure received during instruction execution',
              data: { instruction },
            });
      // TOOD: cases circular dependencies in errors.
      // if we moved the register into the engine out of context we wouldnt error.
      this.context.register.failure.push(e);
    }
    return instruction;
  }

  canCatchError(instruction: Instruction) {
    return this.hasError() && !(instruction instanceof Catch);
  }

  hasError(): boolean {
    return Boolean(this.context.register.failure.peek());
  }

  hasNext(): boolean {
    return Boolean(this.context.instructions.peek());
  }

  peek(): Instruction | undefined {
    return this.context.instructions.peek();
  }
}
