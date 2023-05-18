import { Context, Instruction } from './framework';

export type IfDefinition = unknown;

export class If implements Instruction {
  private readonly definition: IfDefinition;
  constructor(def: IfDefinition) {
    this.definition = def;
  }

  process(ctx: Context): void {
    throw new Error('unimplemented');
  }
}
