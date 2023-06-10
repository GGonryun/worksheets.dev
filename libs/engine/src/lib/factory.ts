import { Stack, Heap } from '@worksheets/util/data-structures';
import { Execution, ExecutionFailure } from '..';
import { Compiler, YAMLCompiler } from './compiler';
import { Register, Instruction } from './framework';
import { Init } from './instructions';
import { Library } from '@worksheets/apps/framework';
import { ExecutionSerializer, Serializer } from './serializer';
import { SnapshotEntity } from '@worksheets/data-access/tasks';

// The runtime can also decide which library we want to run, we can swap it out in the runtime we need to.
export type FactoryOptions = {
  library: Library;
};

export type CreationOptions = {
  yaml: string;
  input?: unknown;
};

export class ExecutionFactory {
  public readonly compiler: Compiler;
  public readonly library: Library;
  public readonly serializer: Serializer<Execution, SnapshotEntity>;
  // change values to override the initial memory for all executions this runtime creates.
  public readonly memory: Heap;

  constructor({ library }: FactoryOptions) {
    this.compiler = new YAMLCompiler();
    this.library = library;
    this.serializer = new ExecutionSerializer(library);
    this.memory = new Heap();
  }

  async create({ yaml, input }: CreationOptions) {
    const register = new Register();
    const instructions = new Stack<Instruction>();
    const memory = this.memory.clone();

    register.yaml = yaml;
    if (input) {
      register.input = input;
    }

    let def;
    try {
      def = await this.compiler.compile(yaml);
    } catch (error) {
      throw new ExecutionFailure({
        code: 'invalid-syntax',
        message: 'failed to ccompile worksheet',
        cause: error,
      });
    }

    instructions.push(new Init(def));

    return new Execution({
      register,
      library: this.library,
      instructions,
      memory,
    });
  }

  save(execution: Execution): SnapshotEntity {
    return this.serializer.serialize(execution);
  }

  load(snapshot: SnapshotEntity): Execution {
    return this.serializer.deserialize(snapshot);
  }
}
