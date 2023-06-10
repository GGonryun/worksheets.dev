import { ExecutionFailure } from '../failures';
import { Context, Instruction } from '../framework';
import { Assignment } from './assignment';

export type AssignDefinition = { [key: string]: unknown }[];

export type AssignInstruction = {
  type: 'assign';
  definition: AssignDefinition;
};

export class Assign implements Instruction {
  public readonly definition: AssignDefinition;
  public readonly type = 'assign';

  constructor(def: AssignDefinition) {
    if (!def || !Array.isArray(def)) {
      throw new ExecutionFailure({
        code: 'invalid-instruction',
        message: 'Assign instruction only accepts arrays of data',
        data: def,
      });
    }

    this.definition = def;
  }

  async process(ctx: Context): Promise<void> {
    for (const pair of this.definition) {
      for (const key in pair) {
        // if (key === 'assign') continue; // should technically we skip here?
        const value = pair[key];
        ctx.instructions.push(new Assignment({ key, value }));
      }
    }
  }
}
