import { Stack } from '@worksheets/util/data-structures';
import { Controller, Execution, ExecutionFailure, Logger } from '..';
import { Compiler, YAMLCompiler } from './compiler';
import {
  Register,
  Instruction,
  Memory,
  References,
  Instructions,
  StackLimits,
  Library,
} from './framework';
import { Init } from './instructions';
import { ExecutionSerializer, Serializer, Snapshot } from './serializer';

// The runtime can also decide which library we want to run, we can swap it out in the runtime we need to.
export type FactoryOptions = {
  execution: {
    library: Library;
    controller: Controller;
    logger: Logger;
  };
  stack: StackLimits;
};

export type CreationOptions = {
  text: string;
  input?: unknown;
};

export class ExecutionFactory implements Serializer<Execution, Snapshot> {
  private readonly opts: FactoryOptions;
  private readonly compiler: Compiler;
  private readonly serializer: Serializer<Execution, Snapshot>;
  public readonly memory: Memory;

  constructor(opts: FactoryOptions) {
    this.compiler = new YAMLCompiler();
    this.opts = opts;
    this.serializer = new ExecutionSerializer(opts);
    this.memory = new Memory();
  }

  async create({ text, input }: CreationOptions) {
    const register = new Register();
    const references = new References();
    const instructions = new Instructions(
      new Stack<Instruction>(),
      this.opts.stack
    );
    const memory = this.memory.clone();

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
      ...this.opts.execution,
      register,
      instructions,
      memory,
      references,
    });
  }

  serialize(execution: Execution): Snapshot {
    return this.serializer.serialize(execution);
  }

  deserialize(snapshot: Snapshot): Execution {
    return this.serializer.deserialize(snapshot);
  }
}
