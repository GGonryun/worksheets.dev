import { Context, Instruction } from '../framework';

export type ReturnDefinition = number | string;

export class Return implements Instruction {
  private readonly definition: ReturnDefinition;
  constructor(def: ReturnDefinition) {
    this.definition = def;
  }
  async process({ register, scripts }: Context): Promise<void> {
    const d = this.definition;
    if (typeof d === 'string') {
      register.output = scripts.parse(d);
    } else {
      register.output = d;
    }
  }
}
