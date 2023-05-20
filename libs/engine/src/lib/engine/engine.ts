import { Failure } from '@worksheets/util-errors';
import { ExecutionFailure } from '../failures';
import { Catch } from '../instructions/catch';
import { Context, Instruction } from '../framework';

export type IterateLifeCycleCodes =
  | 'prePop'
  | 'pop'
  | 'done'
  | 'checking'
  | 'skipped'
  | 'preProcess'
  | 'processed'
  | 'erroring'
  | 'errored';

export type LifeCycleHook<T> = (code: T, instruction?: Instruction) => void;

function op<T>(on?: LifeCycleHook<T>) {
  return function (code: T, instruction?: Instruction) {
    on && on(code, instruction);
  };
}

export class Engine {
  private readonly context: Context;
  constructor(ctx: Context = new Context()) {
    this.context = ctx;
  }

  // todo: what we want is to trigger effects before/after which is a lot like a state machine.
  // if we can convert the engine into a state machine we can add beforeState and afterState triggers.
  // and then organize a clearer picture of the order of events
  async iterate(on?: LifeCycleHook<IterateLifeCycleCodes>) {
    op(on)('prePop', undefined);
    const instruction = this.context.instructions.pop();
    op(on)('pop', instruction);
    if (!instruction) {
      op(on)('done', instruction);
      return;
    }
    op(on)('checking', instruction);
    if (this.canCatchError(instruction)) {
      op(on)('skipped', instruction);
      return;
    }

    try {
      op(on)('preProcess', instruction);
      instruction.process(this.context);
      op(on)('processed', instruction);
    } catch (error) {
      op(on)('erroring', instruction);
      const e =
        error instanceof ExecutionFailure
          ? error
          : new Failure({
              cause: error,
              message:
                'unexpected failure received during instruction execution',
              data: { instruction },
            });

      this.context.register.failure.push(e);
      op(on)('errored', instruction);
    }
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
