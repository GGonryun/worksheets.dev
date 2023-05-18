import { Context, Instruction } from './instructions/instructions';

export class Engine {
  private readonly context: Context;
  constructor(ctx: Context = new Context()) {
    this.context = ctx;
  }

  async iterate() {
    const instruction = this.context.stack.pop();
    instruction?.process(this.context);
  }

  hasNext(): boolean {
    return Boolean(this.context.stack.peek());
  }

  peek(): Instruction | undefined {
    return this.context.stack.peek();
  }
}
