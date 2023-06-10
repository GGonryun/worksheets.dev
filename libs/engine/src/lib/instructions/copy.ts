import { Address, Instruction, Context } from '../framework';

export type CopyDefinition = { to: Address; from: Address };
export class Copy implements Instruction {
  readonly type = 'copy';
  readonly definition: CopyDefinition;

  /**
   * Copies data across memory.
   *
   * @param def take data 'from' another address and place back in 'to' memory in a new address.
   */
  constructor(def: CopyDefinition) {
    this.definition = def;
  }

  async process(ctx: Context): Promise<void> {
    const { to, from } = this.definition;
    const data = ctx.memory.get(from);
    ctx.memory.put(to, data);
  }
}
