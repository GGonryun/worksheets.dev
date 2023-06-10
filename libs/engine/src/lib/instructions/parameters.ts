import { Assignment } from './assignment';
import { Context, Instruction } from '../framework';

export type ParametersDefinition = string;

export class Parameters implements Instruction {
  readonly type = 'parameters';
  readonly definition: ParametersDefinition;
  constructor(def: ParametersDefinition) {
    this.definition = def;
  }
  serialize(): SerializedParameters {
    return { type: 'parameters', definition: this.definition };
  }
  async process(ctx: Context): Promise<void> {
    const instruction = new Assignment({
      key: this.definition,
      value: ctx.register.input,
    });
    ctx.instructions.push(instruction);
  }
}

export type SerializedParameters = {
  type: 'parameters';
  definition: ParametersDefinition;
};
