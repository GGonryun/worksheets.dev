import { ExecutionFailure } from '../failures';
import { Context, Instruction } from '../framework';
import { Loop } from './loop';

export type BreakDefinition = { type: 'break' };

export class Break implements Instruction {
  private readonly definition: BreakDefinition;
  constructor(def: BreakDefinition) {
    this.definition = def;
  }
  async process(ctx: Context): Promise<void> {
    const canBreak = ctx.instructions.peekUntil(
      (instruction) => instruction instanceof Loop
    );

    if (!canBreak) {
      throw new ExecutionFailure({
        code: 'invalid-break-statement',
        message: `a break instruction exists outside of a loop`,
        definition: this.definition,
        context: ctx,
      });
    }

    let current;
    do {
      // look ahead and throw an error if we can't find an instruction
      current = ctx.instructions.pop();
    } while (current != null && !(current instanceof Loop));
  }
}
