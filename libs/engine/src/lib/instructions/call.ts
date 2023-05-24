import { isObject } from 'lodash';
import { Assignment } from './assignment';
import { Context, Instruction } from '../framework';

export type CallDefinition = { call: string; input?: unknown; output?: string };

export function isCallDefinition(
  definition: unknown
): definition is CallDefinition {
  if (!isObject(definition)) return false;
  if (!('call' in definition)) return false;
  return true;
}

export class Call implements Instruction {
  private readonly definition: CallDefinition;
  constructor(def: CallDefinition) {
    this.definition = def;
  }

  async process(ctx: Context): Promise<void> {
    const { call: path, input, output } = this.definition;
    const resolved = await ctx.scripts.recursiveParse(input);
    const result = await ctx.library.call(path, resolved);
    if (output) {
      ctx.instructions.push(
        new Assignment({
          key: output,
          value: result,
        })
      );
    }
  }
}
