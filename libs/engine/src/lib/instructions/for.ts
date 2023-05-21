import { isArrayLike } from 'lodash';
import { ExecutionFailure } from '../failures';
import { Context, Instruction } from '../framework';
import { Loop } from './loop';
import { RestoreHeap } from './restoreHeap';
import { StepsDefinition } from './steps';

export type ForDefinition = {
  for: string;
  index: string;
  value: string;
  steps: StepsDefinition[];
};

export class For implements Instruction {
  private readonly definition: ForDefinition;
  constructor(def: ForDefinition) {
    this.definition = def;
  }

  async process(ctx: Context): Promise<void> {
    const { memory, instructions: stack } = ctx;
    const { for: address, index } = this.definition;

    // validate inputs before pushing instructions onto the stack.
    if (!index) {
      throw new ExecutionFailure({
        code: 'missing-required-parameter',
        message: 'missing index address',
        definition: this.definition,
        context: ctx,
      });
    }
    const list = memory.get(address);
    if (!list) {
      throw new ExecutionFailure({
        code: 'missing-required-parameter',
        message: 'missing a list',
        definition: this.definition,
        context: ctx,
      });
    }
    if (!isArrayLike(list)) {
      throw new ExecutionFailure({
        code: 'invalid-argument-type',
        message: `element at '${address}' is not iterable`,
        definition: this.definition,
        context: ctx,
      });
    }

    // for loop creates a private scope.
    stack.push(new RestoreHeap(memory.clone()));
    stack.push(new Loop(this.definition));
  }
}
