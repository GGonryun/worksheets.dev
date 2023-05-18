import { getTextBetweenReferenceBrackets } from '../util';
import { Context, Instruction } from './instructions';

export type TerminateDefinition = number | string;

export class Terminate implements Instruction {
  private readonly definition: TerminateDefinition;
  constructor(def: TerminateDefinition) {
    this.definition = def;
  }
  process(ctx: Context): void {
    if (typeof this.definition === 'string') {
      ctx.info.output = this.evaluateVariables(ctx, this.definition);
    } else {
      ctx.info.output = this.definition;
    }
  }

  private evaluateVariables(ctx: Context, def: string): string {
    const keys = getTextBetweenReferenceBrackets(def);
    let clone = `${def}`;
    for (const key of keys) {
      const v = ctx.heap.get(key);
      clone = clone.replace(`\${${key}}`, v);
    }
    return clone;
  }
}
