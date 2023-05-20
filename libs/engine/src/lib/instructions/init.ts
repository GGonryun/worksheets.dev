import { Assign } from './assign';
import { Context, Instruction } from '../framework';
import { Parameters } from './parameters';
import { Return } from './return';

export type InitDefinition = {
  version: 1;
  name: string;
  params: string;
  assign: { [key: string]: string };
  return: number | string;
};

export class Init implements Instruction {
  private readonly definition: InitDefinition;
  constructor(def: InitDefinition) {
    this.definition = def;
  }

  async process(ctx: Context): Promise<void> {
    const { name, version, return: r, params, assign } = this.definition;
    if (name) {
      ctx.register.name = name;
    }
    if (version) {
      ctx.register.version = version;
    }
    if (r) {
      ctx.instructions.push(new Return(r));
    }
    if (assign) {
      ctx.instructions.push(new Assign(assign));
    }
    if (params) {
      ctx.instructions.push(new Parameters(params));
    }
  }
}
