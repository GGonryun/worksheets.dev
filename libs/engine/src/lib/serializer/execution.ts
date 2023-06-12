import { TaskSnapshotEntity } from '@worksheets/data-access/tasks';
import { Execution } from '../execution';
import { Serializer } from './serializer';
import { MemorySerializer } from './memory';
import { RegisterSerializer } from './register';
import { InstructionsSerializer } from './instruction';
import { Keys } from '@worksheets/util/types';
import { Entity } from '@worksheets/firebase/firestore';
import { FactoryOptions } from '../factory';

export type Snapshot = Omit<
  TaskSnapshotEntity,
  Keys<Entity> | 'createdAt' | 'updatedAt'
>;

/**
 * @remarks another construction method for executions
 * @todo: notice how the initialization objects are passed down from the execution factory to the execution serializer to the execution.
 */
export class ExecutionSerializer implements Serializer<Execution, Snapshot> {
  private readonly opts: FactoryOptions;
  private readonly serializers: {
    instructions: InstructionsSerializer;
    register: RegisterSerializer;
    memory: MemorySerializer;
  };
  constructor(opts: FactoryOptions) {
    this.opts = opts;
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
      ...this.opts,
    });
  }
}
