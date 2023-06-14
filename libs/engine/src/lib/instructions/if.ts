import { Context, Instruction } from '../framework';
import { Steps, StepsDefinition } from './steps';
import { RestoreScope } from './restore-scope';
import { ExecutionFailure } from '../failures';
import { Return, ReturnDefinition } from './return';
import { Next, NextDefinition } from './next';
import { findFirstExpression } from '../util';
import { CreateScope } from './create-scope';

export type CaseDefinition = {
  if: string;
  steps: StepsDefinition;
  return: ReturnDefinition;
  next: NextDefinition;
};
export type IfDefinition = CaseDefinition[];
export class If implements Instruction {
  readonly type = 'if';
  readonly definition: IfDefinition;
  constructor(def: IfDefinition) {
    this.definition = def;
  }

  async process(ctx: Context): Promise<void> {
    const { definition: def } = this;
    const { instructions, scripts } = ctx;

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
        instructions.push(new RestoreScope());

        if (terminate) {
          instructions.push(new Return(terminate));
        }

        if (next) {
          instructions.push(new Next(next));
        }

        if (steps) {
          instructions.push(new Steps(steps));
        }

        instructions.push(new CreateScope());
        return;
      }
    }
  }
}
