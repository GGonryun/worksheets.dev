import { Context, Instruction } from '../framework';
import { Steps, StepsDefinition } from './steps';
import { RestoreHeap } from './restoreHeap';
import { ExecutionFailure } from '../failures';
import { Return, ReturnDefinition } from './return';
import { Next, NextDefinition } from './next';
import { findFirstExpression } from '../util';

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

    if (def.length) {
      instructions.push(new RestoreHeap(memory.clone()));
    }

    for (let i = 0; i < def.length; i++) {
      const { if: condition, steps, return: terminate, next } = def[i];
      const expression = findFirstExpression(condition);

      if (!expression) {
        throw new ExecutionFailure({
          code: 'invalid-instruction',
          message: `'switch' instruction contains a condition that could not be evaluated at position ${i}. expected a single expression, but received: ${expression}`,
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
