import { TaskSnapshotEntity } from '@worksheets/data-access/tasks';
import { Serializer } from './serializer';
import { Memory } from '../framework';
import { HeapSerializer } from './heap';

export class MemorySerializer
  implements Serializer<Memory, TaskSnapshotEntity['memory']>
{
  private readonly heap = new HeapSerializer();

  serialize(original: Memory): TaskSnapshotEntity['memory'] {
    return original.getHeaps().map((heap) => this.heap.serialize(heap));
  }

  deserialize(serialized: TaskSnapshotEntity['memory']): Memory {
    const deserializedHeaps = serialized.map((heap) =>
      this.heap.deserialize(heap)
    );
    return new Memory(deserializedHeaps);
  }
}
