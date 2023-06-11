import { Stack, Heap } from '@worksheets/util/data-structures';
import { Execution, ExecutionFailure } from '..';
import { Compiler, YAMLCompiler } from './compiler';
import { Register, Instruction } from './framework';
import { Init } from './instructions';
import { Library } from '@worksheets/apps/framework';
import { ExecutionSerializer, Serializer, Snapshot } from './serializer';

// The runtime can also decide which library we want to run, we can swap it out in the runtime we need to.
export type FactoryOptions = {
  library: Library;
};

export type CreationOptions = {
  text: string;
  input?: unknown;
};

export class ExecutionFactory implements Serializer<Execution, Snapshot> {
  public readonly compiler: Compiler;
  public readonly library: Library;
  public readonly serializer: Serializer<Execution, Snapshot>;

  constructor({ library }: FactoryOptions) {
    this.compiler = new YAMLCompiler();
    this.library = library;
    this.serializer = new ExecutionSerializer(library);
  }

  async create({ text, input }: CreationOptions) {
    const register = new Register();
    const instructions = new Stack<Instruction>();
    const memory = new Heap();

    register.yaml = text;
    if (input) {
      register.input = input;
    }

    let def;
    try {
      def = await this.compiler.compile(text);
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

  serialize(execution: Execution): Snapshot {
    return this.serializer.serialize(execution);
  }

  deserialize(snapshot: Snapshot): Execution {
    return this.serializer.deserialize(snapshot);
  }
}
