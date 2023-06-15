import { Context, Instruction } from '../framework';

export type PullRegisterDefinition = {
  address: string | undefined;
  key: keyof Context['register'];
};
export class PullRegister implements Instruction {
  static readonly type = 'pull-register';
  readonly type: string = PullRegister.type;
  readonly definition: PullRegisterDefinition;

  constructor(def: PullRegisterDefinition) {
    this.definition = def;
  }

  async process(ctx: Context): Promise<void> {
    const { key, address } = this.definition;
    if (address) {
      const value = ctx.register[key];
      ctx.memory.putData(address, value);
    }
    ctx.register[key] = undefined;
  }
}
