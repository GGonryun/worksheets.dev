import { isArrayLike } from 'lodash';
import { ExecutionFailure } from '../failures';
import { Context, Instruction } from '../framework';
import { Loop } from './loop';
import { RestoreHeap } from './restoreHeap';
import { StepsDefinition } from './steps';

export type ForDefinition = {
  locators: {
    index: string;
    value: string;
    iterable: string;
  };
  steps: StepsDefinition[];
};

export class For implements Instruction {
  private readonly definition: ForDefinition;
  constructor(def: ForDefinition) {
    this.definition = def;
  }

  async process(ctx: Context): Promise<void> {
    const { memory, instructions: stack } = ctx;
    const { locators } = this.definition;

    // validate inputs before pushing instructions onto the stack.
    if (!locators.index || !locators.iterable) {
      throw new ExecutionFailure({
        code: 'missing-required-parameter',
        message: 'missing required locators',
        definition: this.definition,
        context: ctx,
      });
    }

    const iterable = memory.get(locators.iterable);
    if (!iterable) {
      throw new ExecutionFailure({
        code: 'missing-required-parameter',
        message: 'For instruction requires an iterable',
        definition: this.definition,
        context: ctx,
      });
    }

    if (!isArrayLike(iterable)) {
      throw new ExecutionFailure({
        code: 'invalid-argument-type',
        message: `element in memory '${locators.iterable}' is not iterable`,
        definition: this.definition,
        context: ctx,
        data: { iterable, locators },
      });
    }

    // for loop creates a private scope.
    stack.push(new RestoreHeap(memory.clone()));
    stack.push(new Loop(this.definition));
  }
}
