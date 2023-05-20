import { Assignment } from './assignment';
import { Context, Instruction } from '../framework';

// key of parameter to assign inputs to.
export type ParametersDefinition = string;

export class Parameters implements Instruction {
  private readonly definition: ParametersDefinition;
  constructor(def: ParametersDefinition) {
    this.definition = def;
  }
  async process(ctx: Context): Promise<void> {
    const instruction = new Assignment({
      key: this.definition,
      value: ctx.register.input,
    });
    ctx.instructions.push(instruction);
  }
}
