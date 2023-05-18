import { Context, Instruction } from './framework';

export type ContinueDefinition = unknown;

export class Continue implements Instruction {
  private readonly definition: ContinueDefinition;
  constructor(def: ContinueDefinition) {
    this.definition = def;
  }
  process(ctx: Context): void {
    throw new Error('unimplemented');
  }
}
