import { Context, Instruction } from '../framework';

export type AssignmentDefinition = {
  key: string;
  value: unknown;
};

export class Assignment implements Instruction {
  private readonly definition: AssignmentDefinition;
  constructor(def: AssignmentDefinition) {
    this.definition = def;
  }

  async process(ctx: Context): Promise<void> {
    const { key, value } = this.definition;
    const v = typeof value === 'string' ? ctx.scripts.parse(value) : value;
    ctx.memory.put(key, v);
  }
}
