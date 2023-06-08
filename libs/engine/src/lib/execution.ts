import { Library } from '@worksheets/apps/framework';
import {
  Clock,
  Heap,
  HeightAwareStack,
  Stack,
} from '@worksheets/util/data-structures';
import { Compiler, YAMLCompiler } from './compiler';
import { Engine } from './engine';
import { ScriptEvaluator, ScriptsApplicationBridge } from './evaluator';
import { ExecutionFailure } from './failures';
import { Context, Instruction, Register } from './framework';
import { Init } from './instructions';
import { Failure } from '@worksheets/util/errors';
import { z } from 'zod';

export type ExecutionOptions = {
  memory?: Heap;
  library: Library;
};

export const executionDimensionsSchema = z.object({
  mass: z.number(), // heap size
  width: z.number(), // total number of instructions.
  height: z.number(), // stack size.
  depth: z.number(), // duration.
});

export type ExecutionDimensions = z.infer<typeof executionDimensionsSchema>;

export class Execution {
  private readonly ctx: Context;
  private readonly instructions: HeightAwareStack<Instruction>;
  private readonly engine: Engine;
  private readonly history: Stack<Instruction>;
  private readonly compiler: Compiler;
  private readonly clock: Clock;

  constructor(opts: ExecutionOptions) {
    this.clock = new Clock();
    this.history = new Stack();
    this.instructions = new HeightAwareStack<Instruction>();
    this.compiler = new YAMLCompiler();

    const register = new Register();

    const library = opts.library;
    const memory = opts.memory ?? new Heap();

    const scripts = new ScriptEvaluator(
      memory,
      new ScriptsApplicationBridge(library)
    );

    this.ctx = new Context({
      memory,
      scripts,
      library,
      register,
      instructions: this.instructions,
    });

    this.engine = new Engine(this.ctx);
  }

  async run(yaml: string, input?: unknown): Promise<Register> {
    this.clock.start();

    if (input) {
      this.ctx.register.input = input;
    }

    let def;
    try {
      def = await this.compiler.compile(yaml);
    } catch (error) {
      throw new ExecutionFailure({
        code: 'invalid-syntax',
        message: 'failed to ccompile worksheet',
        cause: error,
      });
    }

    this.ctx.instructions.push(new Init(def));
    let instruction: Instruction | undefined;
    while (!this.ctx.register.halt && this.engine.hasNext()) {
      try {
        instruction = await this.engine.iterate();
      } catch (error) {
        if (error instanceof Failure) throw error;
        console.error('unexpected execution failure', error);
        throw new ExecutionFailure({
          code: 'unexpected',
          message: 'an unexpected error occured during execution',
          cause: error,
        });
      }

      if (instruction) {
        this.history.push(instruction);
      }
    }

    this.clock.stop();
    const failure = this.ctx.register.failure;
    if (failure) {
      console.error(`unhandled method failure`, failure);
      throw new ExecutionFailure({
        code: 'method-failure',
        message: `unhandled method failure: (${failure.code}) ${failure.message}`,
        cause: failure,
      });
    }

    return this.ctx.register;
  }

  dimensions(): ExecutionDimensions {
    const width = this.history.size();
    const height = this.instructions.height();
    const mass = this.ctx.memory.size();
    const depth = this.clock.getExecutionTime() || 1;
    return {
      width,
      height,
      mass,
      depth,
    };
  }

  read() {
    return { history: this.history, context: this.ctx };
  }
}
