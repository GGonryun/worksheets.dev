import { ExecutionFailure } from '../failures';
import { Context, Instruction } from '../framework';
import { CallDefinition } from './call';
import { Init } from './init';
import { CreateScope } from './create-scope';
import { PullRegister } from './pull-register';
import { PushRegister } from './push-register';
import { RestoreScope } from './restore-scope';

export type WorksheetDefinition = Omit<CallDefinition, 'call'> & {
  worksheet: string;
};

export class Worksheet implements Instruction {
  static readonly type = 'function';
  type = Worksheet.type;
  readonly definition: WorksheetDefinition;
  constructor(def: WorksheetDefinition) {
    this.definition = def;
  }
  async process(ctx: Context): Promise<void> {
    const { worksheet: id, input, output } = this.definition;
    const worksheet = ctx.references.get(id);
    if (!worksheet) {
      throw new ExecutionFailure({
        code: 'invalid-instruction',
        message: `Could not find worksheet reference to ${this.definition.worksheet}`,
        data: { order: this.definition },
      });
    }

    // push new init onto the stack
    // create new private scope for the worksheet
    ctx.instructions.push(new PullRegister({ address: output, key: 'output' }));
    ctx.instructions.push(new RestoreScope({ private: true }));
    ctx.instructions.push(new Init({ ...worksheet, name: id }));
    ctx.instructions.push(new CreateScope({ private: true }));
    ctx.instructions.push(new PushRegister({ input }));
  }
}
