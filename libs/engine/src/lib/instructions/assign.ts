import { Context, Instruction } from '../framework';
import { Assignment } from './assignment';

export type AssignDefinition = { [key: string]: unknown };

export class Assign implements Instruction {
  private readonly definition: AssignDefinition;
  constructor(def: AssignDefinition) {
    this.definition = def;
  }

  async process(ctx: Context): Promise<void> {
    for (const key in this.definition) {
      if (key === 'assign') continue;
      const value = this.definition[key];
      ctx.instructions.push(new Assignment({ key, value }));
    }
  }
}
