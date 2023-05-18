import { Context, Instruction } from './framework';

export type RestoreHeapDefinition = unknown;

export class RestoreHeap implements Instruction {
  private readonly definition: RestoreHeapDefinition;
  constructor(def: RestoreHeapDefinition) {
    this.definition = def;
  }

  process(ctx: Context): void {
    throw new Error('unimplemented');
  }
}
