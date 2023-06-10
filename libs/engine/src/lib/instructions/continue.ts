import { Context, Instruction } from '../framework';
import { Loop } from './loop';

export class Continue implements Instruction {
  readonly type = 'continue';
  readonly definition = undefined;

  async process(ctx: Context): Promise<void> {
    const { instructions } = ctx;
    do {
      if (instructions.peek() instanceof Loop) return;
      instructions.pop();
    } while (instructions.peek() != null);
  }
}
