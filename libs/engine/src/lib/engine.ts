import { MethodCallFailure } from '@worksheets/apps/framework';
import { Context, Instruction } from './framework';
import { Catch } from './instructions/catch';

export class Engine {
  private readonly context: Context;
  constructor(ctx: Context) {
    this.context = ctx;
  }

  async iterate(): Promise<Instruction | undefined> {
    const instruction = this.context.instructions.pop();
    if (!instruction) {
      return; // done
    }

    if (this.cannotCatchError(instruction)) {
      return instruction;
    }

    try {
      await instruction.process(this.context);
    } catch (error) {
      if (error instanceof MethodCallFailure) {
        this.context.register.failure = error;
        return instruction;
      }

      throw error;
    }
    return instruction;
  }

  private cannotCatchError(instruction: Instruction) {
    return this.hasError() && !(instruction instanceof Catch);
  }

  hasError(): boolean {
    return Boolean(this.context.register.failure);
  }

  hasNext(): boolean {
    return Boolean(this.context.instructions.peek());
  }

  peek(): Instruction | undefined {
    return this.context.instructions.peek();
  }
}
