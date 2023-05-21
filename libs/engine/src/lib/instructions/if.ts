import { Context, Instruction } from '../framework';
import { Steps, StepsDefinition } from './steps';
import { RestoreHeap } from './restoreHeap';
import { findFirstExpression } from '../util';
import { ExecutionFailure } from '../failures';

export type CaseDefinition = { if: string; steps: StepsDefinition };
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
      const { if: condition, steps } = def[i];
      const expression = findFirstExpression(condition);
      if (!expression) {
        throw new ExecutionFailure({
          code: 'missing-required-parameter',
          message: `if condition ${i} expression requires exactly one expression: ${condition}`,
          context: ctx,
          definition: this.definition,
        });
      }
      if (await scripts.evaluate(expression)) {
        instructions.push(new Steps(steps));
        return;
      }
    }
  }
}
