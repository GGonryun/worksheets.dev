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
  readonly type = 'for';
  readonly definition: ForDefinition;
  constructor(def: ForDefinition) {
    this.definition = def;
  }

  async process(ctx: Context): Promise<void> {
    const { memory, instructions: stack } = ctx;
    const { for: address, index } = this.definition;

    if (!index) {
      throw new ExecutionFailure({
        code: 'invalid-instruction',
        message: `'for' instruction is missing required parameter: "index"`,
      });
    }
    const list = memory.get(address);
    if (!list) {
      throw new ExecutionFailure({
        code: 'invalid-instruction',
        message: `'for' instruction is missing required parameter: 'list'`,
      });
    }
    if (!isArrayLike(list)) {
      throw new ExecutionFailure({
        code: 'invalid-instruction',
        message: `'for' instruction cannot iterate over list at address '${address}' expected iterable but received: '${typeof list}'`,
      });
    }

    stack.push(new RestoreHeap(memory.clone()));
    stack.push(new Loop(this.definition));
  }
}
