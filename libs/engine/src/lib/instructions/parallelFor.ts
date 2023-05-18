import { Context, Instruction } from './framework';

export type ParallelForDefinition = unknown;

export class ParallelFor implements Instruction {
  private readonly definition: ParallelForDefinition;
  constructor(def: ParallelForDefinition) {
    this.definition = def;
  }

  process(ctx: Context): void {
    throw new Error('unimplemented');
  }
}
