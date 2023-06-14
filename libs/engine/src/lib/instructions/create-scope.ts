import { Context, Instruction } from '../framework';

export class CreateScope implements Instruction {
  readonly type: string = 'create-scope';
  readonly definition: unknown = undefined;

  async process(ctx: Context): Promise<void> {
    ctx.memory.createScope();
  }
}
