import { Context, Instruction } from './instructions/framework';

export class Engine {
  private readonly context: Context;
  constructor(ctx: Context = new Context()) {
    this.context = ctx;
  }

  async iterate() {
    const instruction = this.context.instructions.pop();
    instruction?.process(this.context);
  }

  hasNext(): boolean {
    return Boolean(this.context.instructions.peek());
  }

  peek(): Instruction | undefined {
    return this.context.instructions.peek();
  }
}
