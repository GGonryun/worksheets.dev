import { Context, Instruction } from '../framework';
import { End } from './end';
export type ReturnDefinition =
  | number
  | string
  | { [key: string]: unknown }[]
  | Record<string, string | number>;

export class Return implements Instruction {
  readonly type = 'return';
  readonly definition: ReturnDefinition;

  constructor(def: ReturnDefinition) {
    this.definition = def;
  }

  async process({ instructions, register, scripts }: Context): Promise<void> {
    const def = meld(this.definition);
    register.output = await scripts.recursiveParse(def);
    instructions.push(new End());
  }
}

function meld(def: ReturnDefinition) {
  if (Array.isArray(def)) {
    const obj: Record<string, unknown> = {};
    for (const pair of def) {
      // every pair should only have one key, but technically...
      for (const key in pair) {
        obj[key] = pair[key];
      }
    }
    return obj;
  }
  return def;
}
