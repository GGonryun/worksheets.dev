import { Serializer } from './serializer';
import { Memory } from '../framework';
import { HeapSerializer } from './heap';
import { JSONSerializer } from './json';

type TaskSnapshotEntity = any;
export class MemorySerializer
  implements Serializer<Memory, TaskSnapshotEntity['memory']>
{
  private readonly heap = new HeapSerializer();
  private readonly json = new JSONSerializer<string[][]>();

  serialize(original: Memory): TaskSnapshotEntity['memory'] {
    const scopes = original.scopes();
    if (scopes.length === 0) {
      return '';
    }

    const serialized = scopes.map((scope) =>
      scope.map((heap) => this.heap.serialize(heap))
    );
    return this.json.serialize(serialized);
  }

  deserialize(serialized: TaskSnapshotEntity['memory']): Memory {
    const serializedHeaps = this.json.deserialize(serialized);
    const deserializedHeaps = serializedHeaps.map((list) =>
      list.map((heap) => this.heap.deserialize(heap))
    );
    return new Memory(deserializedHeaps);
  }
}
