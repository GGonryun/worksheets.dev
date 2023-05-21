import { Failure } from '@worksheets/util-errors';
import { Engine } from '../engine';
import { Register, Instruction, Context } from '../framework';
import { Init } from '../instructions';
import { load } from '../util';
import { Heap, Stack } from '../structures';
import { ApplicationLibrary, ApplicationRegistry } from '../applications';

export type ExecutionOptions = {
  memory?: Heap;
  registry?: ApplicationRegistry;
  input?: unknown;
};

export class Execution {
  private readonly ctx: Context;
  private readonly engine: Engine;
  private readonly history: Stack<Instruction>;
  private executed: boolean;

  constructor(opts?: ExecutionOptions) {
    this.executed = false;
    const register = new Register();
    if (opts?.input) {
      register.input = opts.input;
    }

    const memory = opts?.memory ?? new Heap();
    this.ctx = new Context({
      memory,
      register,
      apps: new ApplicationLibrary(opts?.registry),
    });
    this.engine = new Engine(this.ctx);
    this.history = new Stack();
  }

  put(data: { [key: string]: unknown }) {
    for (const key in data) {
      const value = data[key];
      return this.ctx.memory.put(key, value);
    }
  }

  async run(yaml: string): Promise<unknown> {
    if (this.executed)
      throw new Failure({
        message: 'execution context cannot run twice for the same instruction',
        data: { context: this.ctx, history: this.history },
      });

    const def = load(yaml);

    this.ctx.instructions.push(new Init(def));

    while (this.engine.hasNext()) {
      const instruction = await this.engine.iterate();
      if (instruction) {
        this.history.push(instruction);
      }
    }

    const failure = this.ctx.register.failure;

    if (!failure.isEmpty()) {
      throw new Failure({
        message: 'execution failed',
        cause: failure.pop(),
      });
    }
    this.executed = true;
    return this.ctx.register.output;
  }

  read() {
    return { history: this.history, context: this.ctx };
  }
}
