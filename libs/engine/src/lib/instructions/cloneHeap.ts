import { Context, Instruction } from './framework';

export type CloneHeapDefinition = unknown;

export class CloneHeap implements Instruction {
  private readonly definition: CloneHeapDefinition;
  constructor(def: CloneHeapDefinition) {
    this.definition = def;
  }

  process(ctx: Context): void {
    throw new Error('unimplemented');
  }
}
