import { ExecutionFailure } from '../failures';
import { Context, Instruction } from './framework';
import { Loop } from './loop';

export type BreakDefinition = unknown;

export class Break implements Instruction {
  private readonly definition: BreakDefinition;
  constructor(def: BreakDefinition) {
    this.definition = def;
  }
  process(ctx: Context): void {
    const canBreak = ctx.instructions.peekUntil(
      (instruction) => instruction instanceof Loop
    );

    if (!canBreak) {
      throw new ExecutionFailure({
        code: 'incorrect-break-statement',
        message: `a break instruction exists outside of a loop`,
        definition: this.definition,
      });
    }

    let current;
    do {
      // look ahead and throw an error if we can't find an instruction
      current = ctx.instructions.pop();
    } while (current == null || !(current instanceof Loop));
  }
}
