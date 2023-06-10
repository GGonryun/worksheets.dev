import { Heap } from '@worksheets/util/data-structures';
import { Context, Instruction } from '../framework';

export type RestoreHeapDefinition = Heap;

export class RestoreHeap implements Instruction {
  readonly type: string = 'restore';
  readonly definition: RestoreHeapDefinition;
  constructor(def: RestoreHeapDefinition) {
    this.definition = def;
  }

  async process(ctx: Context): Promise<void> {
    const heap = new Heap();
    for (const key of this.definition.keys()) {
      const value = ctx.memory.get(key);
      heap.put(key, value);
    }

    ctx.memory.restore(heap);
  }
}
