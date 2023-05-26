import { ApplicationLibrary } from '@worksheets/apps/framework';
import { Heap, Stack } from '@worksheets/util/data-structures';
import { Compiler, YAMLCompiler } from './compiler';
import { Engine } from './engine';
import { ScriptEvaluator, ScriptsApplicationBridge } from './evaluator';
import { ExecutionFailure } from './failures';
import { Context, Instruction, Register } from './framework';
import { Init } from './instructions';
import { Failure } from '@worksheets/util/errors';

export type ExecutionOptions = {
  memory?: Heap;
  library: ApplicationLibrary;
};

export class Execution {
  private readonly ctx: Context;
  private readonly engine: Engine;
  private readonly history: Stack<Instruction>;
  private readonly compiler: Compiler;

  private executed: boolean;

  constructor(opts: ExecutionOptions) {
    this.executed = false;

    this.history = new Stack();

    this.compiler = new YAMLCompiler();
    const register = new Register();
    const instructions = new Stack<Instruction>();

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
      instructions,
    });

    this.engine = new Engine(this.ctx);
  }

  async run(yaml: string, input?: unknown): Promise<unknown> {
    if (input) {
      this.ctx.register.input = input;
    }

    if (this.executed)
      throw new ExecutionFailure({
        code: 'invalid-precondition',
        message: 'execution context cannot run twice',
      });

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
    while (this.engine.hasNext()) {
      try {
        instruction = await this.engine.iterate();
      } catch (error) {
        if (error instanceof Failure) throw error;
        console.log('error, error', error);

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

    const failure = this.ctx.register.failure;
    if (failure) {
      throw new ExecutionFailure({
        code: 'unhandled-failure',
        message: `an unhandled failure exists: ${failure.message}`,
        cause: failure,
      });
    }

    this.executed = true;
    return this.ctx.register.output;
  }

  read() {
    return { history: this.history, context: this.ctx };
  }
}
