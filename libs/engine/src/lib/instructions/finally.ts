import { ExecutionFailure } from '../failures';
import { Context, Instruction } from '../framework';
import { Steps, StepsDefinition } from './steps';

export type FinallyDefinition = { steps: StepsDefinition };

export class Finally implements Instruction {
  readonly type = 'finally';
  readonly definition: FinallyDefinition;
  constructor(def: FinallyDefinition) {
    this.definition = def;
  }

  async process(ctx: Context): Promise<void> {
    const { instructions } = ctx;
    const def = this.definition;

    if (!def.steps) {
      throw new ExecutionFailure({
        code: 'invalid-instruction',
        message: `The 'finally' instruction is missing required parameter: 'steps'`,
      });
    }

    instructions.push(new Steps(def.steps));
  }
}
