import { Context, Instruction } from '../framework';

export class RestoreScope implements Instruction {
  readonly type: string = 'restore-scope';
  readonly definition: unknown = undefined;

  async process(ctx: Context): Promise<void> {
    ctx.memory.deleteScope();
  }
}
