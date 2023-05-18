import { Context, Instruction } from './framework';

export type AssignmentDefinition = {
  key: string;
  value: unknown;
};

export class Assignment implements Instruction {
  private readonly definition: AssignmentDefinition;
  constructor(def: AssignmentDefinition) {
    this.definition = def;
  }
  process(ctx: Context): void {
    ctx.memory.put(this.definition.key, this.definition.value);
  }
}
