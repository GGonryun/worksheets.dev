import { AssignmentDefinition, Assignment } from './assignment';
import { Context, Instruction } from './framework';

// a list of assignments.
export type AssignDefinition = AssignmentDefinition[];

export class Assign implements Instruction {
  private readonly definition: AssignDefinition;
  constructor(def: AssignDefinition) {
    this.definition = def;
  }
  process(ctx: Context): void {
    for (const assignment of this.definition) {
      ctx.instructions.push(new Assignment(assignment));
    }
  }
}
