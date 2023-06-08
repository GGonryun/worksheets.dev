import { Context, Instruction } from '../framework';

export class Halt implements Instruction {
  async process(ctx: Context): Promise<void> {
    const { register } = ctx;

    register.halt = true;
  }
}
