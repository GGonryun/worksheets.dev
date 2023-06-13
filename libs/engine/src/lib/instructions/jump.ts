import { ExecutionFailure } from '../failures';
import { Context, Instruction } from '../framework';

export type JumpDefinition = { jump: 'halt' };
export class Jump implements Instruction {
  readonly type = 'jump';
  readonly definition: JumpDefinition;
  constructor(def: JumpDefinition) {
    this.definition = def;
  }
  async process(ctx: Context): Promise<void> {
    const { controller } = ctx;
    if (this.definition.jump === 'halt') {
      controller.cancel(
        new ExecutionFailure({
          code: 'retry',
          message: 'halted by jump instruction',
        })
      );

      return;
    }

    throw new ExecutionFailure({
      code: 'invalid-definition',
      message: `jump definition can only process halt orders`,
      data: { order: this.definition },
    });
  }
}
