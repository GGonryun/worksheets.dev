import { SnapshotEntity } from '@worksheets/data-access/tasks';
import { Heap } from '@worksheets/util/data-structures';
import { Serializer } from './serializer';
import { JSONSerializer } from './json';

export class MemorySerializer
  implements Serializer<Heap, SnapshotEntity['memory']>
{
  private readonly json = new JSONSerializer();

  serialize(original: Heap): Record<string, string> {
    const data = original.getAll();
    const serialized: Record<string, string> = {};

    for (const key in data) {
      const value = data[key];
      serialized[key] = this.json.serialize(value);
    }

    return serialized;
  }

  deserialize(serialized: Record<string, string>): Heap {
    const deserialized: Record<string, unknown> = {};

    for (const key in serialized) {
      const value = serialized[key];
      deserialized[key] = this.json.deserialize(value);
    }

    return new Heap(deserialized);
  }
}
