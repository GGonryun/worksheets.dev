import { TaskSnapshotEntity } from '@worksheets/data-access/tasks';
import { Serializer } from './serializer';
import { References } from '../framework';
import { JSONSerializer } from './json';
import { SingleMethodInitDefinition } from '../instructions';

export class ReferencesSerializer
  implements Serializer<References, TaskSnapshotEntity['references']>
{
  private readonly init = new JSONSerializer<SingleMethodInitDefinition>();

  serialize(original: References): TaskSnapshotEntity['references'] {
    const serialized: TaskSnapshotEntity['references'] = {};
    for (const key in original.all()) {
      const initDef = original.get(key);
      serialized[key] = this.init.serialize(initDef);
    }
    return serialized;
  }

  deserialize(serialized: TaskSnapshotEntity['references']): References {
    const deserialized: References = new References();
    for (const key in serialized) {
      const initDef = this.init.deserialize(serialized[key]);
      deserialized.set(key, initDef);
    }
    return deserialized;
  }
}
