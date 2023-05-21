import { Context, Instruction } from '../framework';
import { Steps, StepsDefinition } from './steps';
import { RestoreHeap } from './restoreHeap';
import { findFirstExpression } from '../util';
import { ExecutionFailure } from '../failures';
import { Return, ReturnDefinition } from './return';
import { Next, NextDefinition } from './next';

export type CaseDefinition = {
  if: string;
  steps: StepsDefinition;
  return: ReturnDefinition;
  next: NextDefinition;
};
export type IfDefinition = CaseDefinition[];
export class If implements Instruction {
  private readonly definition: IfDefinition;
  constructor(def: IfDefinition) {
    this.definition = def;
  }

  async process(ctx: Context): Promise<void> {
    const { definition: def } = this;
    const { memory, instructions, scripts } = ctx;
    const cache = memory.clone();
    instructions.push(new RestoreHeap(cache));
    for (let i = 0; i < def.length; i++) {
      const { if: condition, steps, return: terminate, next } = def[i];
      const expression = findFirstExpression(condition);
      if (!expression) {
        throw new ExecutionFailure({
          code: 'missing-required-parameter',
          message: `if condition ${i} expression is invalid`,
          context: ctx,
          definition: this.definition,
        });
      }
      if (await scripts.evaluate(expression)) {
        if (terminate) {
          instructions.push(new Return(terminate));
        }

        if (next) {
          instructions.push(new Next(next));
        }

        if (steps) {
          instructions.push(new Steps(steps));
        }
        return;
      }
    }
  }
}
