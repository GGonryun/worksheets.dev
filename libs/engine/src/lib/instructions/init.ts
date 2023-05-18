import { Context, Instruction } from './framework';
import { Parameters } from './parameters';
import { Return } from './return';

export type InitDefinition = {
  version: 1;
  name: string;
  params: string;
  return: number | string;
};

export class Init implements Instruction {
  private readonly definition: InitDefinition;
  constructor(def: InitDefinition) {
    this.definition = def;
  }

  process(ctx: Context): void {
    const { name, version, return: r, params } = this.definition;
    if (name) {
      ctx.register.name = name;
    }
    if (version) {
      ctx.register.version = version;
    }
    if (r) {
      ctx.instructions.push(new Return(r));
    }
    if (params) {
      ctx.instructions.push(new Parameters(params));
    }
  }
}
