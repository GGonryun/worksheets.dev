import { Context, Instruction } from './framework';

export type CallDefinition = unknown;

export class Call implements Instruction {
  private readonly definition: CallDefinition;
  constructor(def: CallDefinition) {
    this.definition = def;
  }

  process(ctx: Context): void {
    throw new Error('unimplemented');
  }
}
