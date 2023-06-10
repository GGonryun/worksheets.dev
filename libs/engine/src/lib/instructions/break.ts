import { ExecutionFailure } from '../failures';
import { Context, Instruction } from '../framework';
import { Loop } from './loop';

export class Break implements Instruction {
  readonly type = 'break';
  readonly definition = undefined;

  async process(ctx: Context): Promise<void> {
    // look ahead and throw an error if we can't find an instruction
    const canBreak = ctx.instructions.peekUntil(
      (instruction) => instruction instanceof Loop
    );

    if (!canBreak) {
      throw new ExecutionFailure({
        code: 'invalid-instruction',
        message: `'break' instruction cannot exist outside of a loop`,
      });
    }

    let current;
    do {
      current = ctx.instructions.pop();
    } while (current != null && !(current instanceof Loop));
  }
}
