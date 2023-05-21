import { Assign } from './assign';
import { Context, Instruction } from '../framework';
import { Parameters } from './parameters';
import { Return } from './return';
import { Definition } from './definition';
import { Steps } from './steps';
import { ExecutionFailure } from '../failures';

export type InitDefinition = {
  version: 1;
  name: string;
  params: string;
  assign: { [key: string]: string };
  return: number | string;
  steps: Definition[];
};

export class Init implements Instruction {
  private readonly definition: InitDefinition;
  constructor(def: InitDefinition) {
    this.definition = def;
  }

  async process(ctx: Context): Promise<void> {
    const { name, version, return: r, params, assign, steps } = this.definition;
    if (!r && !steps && !assign && !params) {
      throw new ExecutionFailure({
        code: 'missing-required-parameter',
        message: 'worksheet must have at least one parameter specified',
        context: ctx,
        definition: this.definition,
      });
    }
    if (name) {
      ctx.register.name = name;
    }
    if (version) {
      ctx.register.version = version;
    }
    if (r) {
      ctx.instructions.push(new Return(r));
    }
    if (steps) {
      ctx.instructions.push(new Steps(steps));
    }
    if (assign) {
      ctx.instructions.push(new Assign(assign));
    }
    if (params) {
      ctx.instructions.push(new Parameters(params));
    }
  }
}
