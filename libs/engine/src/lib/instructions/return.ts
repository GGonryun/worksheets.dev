import { getTextBetweenReferenceBrackets } from '../util';
import { Context, Instruction } from './framework';

export type ReturnDefinition = number | string;

export class Return implements Instruction {
  private readonly definition: ReturnDefinition;
  constructor(def: ReturnDefinition) {
    this.definition = def;
  }
  process(ctx: Context): void {
    if (typeof this.definition === 'string') {
      ctx.register.output = this.evaluateVariables(ctx, this.definition);
    } else {
      ctx.register.output = this.definition;
    }
  }

  private evaluateVariables(ctx: Context, def: string): string {
    const keys = getTextBetweenReferenceBrackets(def);
    let clone = `${def}`;
    for (const key of keys) {
      const v = ctx.memory.get(key);
      clone = clone.replace(`\${${key}}`, v);
    }
    return clone;
  }
}
