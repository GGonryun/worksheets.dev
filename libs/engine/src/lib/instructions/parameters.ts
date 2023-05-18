import { Assignment } from './assignment';
import { Context, Instruction } from './framework';

// key of parameter to assign inputs to.
export type ParametersDefinition = string;

export class Parameters implements Instruction {
  private readonly definition: ParametersDefinition;
  constructor(def: ParametersDefinition) {
    this.definition = def;
  }
  process(ctx: Context): void {
    // assign parameters to heap.
    ctx.instructions.push(
      new Assignment({ key: this.definition, value: ctx.register.input })
    );
  }
}
