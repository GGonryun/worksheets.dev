import { Context, Instruction } from './instructions';

// key of parameter to assign inputs to.
export type ParametersDefinition = string;

export class Parameters implements Instruction {
  private readonly definition: ParametersDefinition;
  constructor(def: ParametersDefinition) {
    this.definition = def;
  }
  process(ctx: Context): void {
    // assign parameters to heap.
    const heap = ctx.heap;
    heap.put(this.definition, ctx.info.input);
  }
}
