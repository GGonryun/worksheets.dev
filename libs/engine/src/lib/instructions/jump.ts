import { ExecutionFailure } from '../failures';
import { Context, Instruction } from '../framework';

export type JumpDefinition = 'halt';
export class Jump implements Instruction {
  readonly type = 'jump';
  readonly definition: JumpDefinition;
  constructor(def: JumpDefinition) {
    this.definition = def;
  }
  async process(ctx: Context): Promise<void> {
    const { register } = ctx;
    if (this.definition === 'halt') {
      register.halt = true;
      return;
    }

    throw new ExecutionFailure({
      code: 'invalid-definition',
      message: `jump definition can only process halt orders`,
      data: { order: this.definition },
    });
  }
}
