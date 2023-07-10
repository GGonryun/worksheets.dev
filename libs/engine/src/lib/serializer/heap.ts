import { Heap } from '@worksheets/util/data-structures';
import { JSONSerializer } from './json';
import { Serializer } from './serializer';
import { TaskSnapshotEntity } from '@worksheets/schemas-executions';

export class HeapSerializer
  implements Serializer<Heap, TaskSnapshotEntity['memory'][number][number]>
{
  private readonly json = new JSONSerializer<Heap['data']>();

  serialize(original: Heap): TaskSnapshotEntity['memory'][number][number] {
    return this.json.serialize(original.getAll());
  }

  deserialize(serialized: TaskSnapshotEntity['memory'][number][number]): Heap {
    return new Heap(this.json.deserialize(serialized));
  }
}
