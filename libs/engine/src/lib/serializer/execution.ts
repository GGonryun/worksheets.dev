import { Library } from '@worksheets/apps/framework';
import { SnapshotEntity } from '@worksheets/data-access/tasks';
import { Execution } from '../execution';
import { Serializer } from './serializer';
import { MemorySerializer } from './memory';
import { RegisterSerializer } from './register';
import { InstructionsSerializer } from './instruction';

export class ExecutionSerializer
  implements Serializer<Execution, SnapshotEntity>
{
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

  serialize(execution: Execution): SnapshotEntity {
    const { instructions, memory, register } = this.serializers;
    return {
      instructions: instructions.serialize(execution.ctx.instructions),
      memory: memory.serialize(execution.ctx.memory),
      register: register.serialize(execution.ctx.register),
    };
  }
  deserialize(data: SnapshotEntity): Execution {
    const { instructions, memory, register } = this.serializers;

    return new Execution({
      instructions: instructions.deserialize(data.instructions),
      register: register.deserialize(data.register),
      memory: memory.deserialize(data.memory),
      library: this.library,
    });
  }
}
