import { Context, Instruction, Register } from '../framework';

export type PushRegisterDefinition = Partial<Register>;

export class PushRegister implements Instruction {
  static readonly type = 'push-register';
  readonly type: string = PushRegister.type;
  readonly definition: PushRegisterDefinition;

  constructor(def: PushRegisterDefinition) {
    this.definition = def;
  }

  async process(ctx: Context): Promise<void> {
    const { input, output } = this.definition;
    if (input) {
      ctx.register.input = await ctx.scripts.recursiveParse(input);
    }

    if (output) {
      ctx.register.output = await ctx.scripts.recursiveParse(output);
    }
  }
}
