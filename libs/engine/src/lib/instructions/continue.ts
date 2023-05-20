import { Context, Instruction } from '../framework';
import { Loop } from './loop';

export class Continue implements Instruction {
  async process(ctx: Context): Promise<void> {
    const { peek, pop } = ctx.instructions;
    do {
      if (peek() instanceof Loop) return;
      pop();
    } while (peek() != null);
  }
}
