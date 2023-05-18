import { Context, Instruction } from './instructions';
import { Parameters } from './parameters';
import { Terminate } from './terminate';

export type InitDefinition = {
  version: 1;
  name: string;
  // the specific key to save input parameters to.
  input: string;
  output: number | string;
};

export class Init implements Instruction {
  private readonly definition: InitDefinition;
  constructor(def: InitDefinition) {
    this.definition = def;
  }

  process(ctx: Context): void {
    const { name, version, output, input } = this.definition;
    if (name) {
      ctx.info.name = name;
    }
    if (version) {
      ctx.info.version = version;
    }
    if (output) {
      ctx.stack.push(new Terminate(output));
    }
    if (input) {
      ctx.stack.push(new Parameters(input));
    }
  }
}
