import { Failure } from '@worksheets/util-errors';
import { Engine } from '../engine';
import { Register, Stack, Instruction } from '../framework/framework';
import { Init } from '../instructions/init';
import { load } from '../util';
import { Context } from '../framework/context';

export class Execution {
  private readonly ctx: Context;
  private readonly engine: Engine;
  private readonly history: Stack<Instruction>;
  private executed: boolean;

  constructor(input: unknown) {
    this.executed = false;
    const register = new Register();
    if (input) {
      register.input = input;
    }
    this.ctx = new Context({ register });
    this.engine = new Engine(this.ctx);
    this.history = new Stack();
  }
  put(data: { [key: string]: unknown }) {
    for (const key in data) {
      const value = data[key];
      return this.ctx.memory.put(key, value);
    }
  }
  async run(yaml: string) {
    if (this.executed)
      throw new Failure({
        message: 'execution context cannot run twice for the same instruction',
        data: { context: this.ctx, history: this.history },
      });

    const def = load(yaml);

    this.ctx.instructions.push(new Init(def));

    while (this.engine.hasNext()) {
      await this.engine.iterate((code, instruction) => {
        if (code === 'processed' && instruction) {
          this.history.push(instruction);
        }
        if (code === 'erroring') {
          console.log(`execution has run into an error`, instruction);
        }
      });
    }

    const failure = this.ctx.register.failure;

    if (!failure.isEmpty()) {
      failure.peekAll((failure, index) => {
        console.log(`execution has unhandled failure ${index}:`, failure);
      });
      throw new Failure({
        message: 'execution context failed to run yaml',
        cause: 'check data',
        data: failure,
      });
    }
    this.executed = true;
    return this.ctx.register.output;
  }
}
