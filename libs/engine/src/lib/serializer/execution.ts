import { Library } from '@worksheets/apps/framework';
import { TaskSnapshotEntity } from '@worksheets/data-access/tasks';
import { Execution } from '../execution';
import { Serializer } from './serializer';
import { MemorySerializer } from './memory';
import { RegisterSerializer } from './register';
import { InstructionsSerializer } from './instruction';
import { Keys } from '@worksheets/util/types';
import { Entity } from '@worksheets/firebase/firestore';

export type Snapshot = Omit<TaskSnapshotEntity, Keys<Entity>>;

export class ExecutionSerializer implements Serializer<Execution, Snapshot> {
  private readonly library: Library;
  private readonly serializers: {
    instructions: InstructionsSerializer;
    register: RegisterSerializer;
    memory: MemorySerializer;
  };
  constructor(library: Library) {
    this.library = library;
    this.serializers = {
      instructions: new InstructionsSerializer(),
      register: new RegisterSerializer(),
      memory: new MemorySerializer(),
    };
  }

  serialize(execution: Execution): Snapshot {
    const { instructions, memory, register } = this.serializers;
    return {
      instructions: instructions.serialize(execution.ctx.instructions),
      memory: memory.serialize(execution.ctx.memory),
      register: register.serialize(execution.ctx.register),
    };
  }
  deserialize(data: Snapshot): Execution {
    const { instructions, memory, register } = this.serializers;

    return new Execution({
      instructions: instructions.deserialize(data.instructions),
      register: register.deserialize(data.register),
      memory: memory.deserialize(data.memory),
      library: this.library,
    });
  }
}
