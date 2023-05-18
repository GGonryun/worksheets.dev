import { Context, Instruction } from './framework';

export type CatchDefinition = unknown;

export class Catch implements Instruction {
  private readonly definition: CatchDefinition;
  constructor(def: CatchDefinition) {
    this.definition = def;
  }

  process(ctx: Context): void {
    throw new Error('unimplemented');
  }
}
