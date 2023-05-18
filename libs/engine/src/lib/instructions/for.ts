import { Context, Instruction } from './framework';

export type ForDefinition = unknown;

export class For implements Instruction {
  private readonly definition: ForDefinition;
  constructor(def: ForDefinition) {
    this.definition = def;
  }

  process(ctx: Context): void {
    throw new Error('unimplemented');
  }
}
