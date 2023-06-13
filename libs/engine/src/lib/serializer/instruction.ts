import { Instruction, SerializedInstruction } from '../framework';
import { Stack } from '@worksheets/util/data-structures';
import {
  Assign,
  AssignDefinition,
  Assignment,
  AssignmentDefinition,
  Break,
  Call,
  CallDefinition,
  Catch,
  CatchDefinition,
  Continue,
  Copy,
  CopyDefinition,
  Delay,
  DelayDefinition,
  End,
  Evaluate,
  EvaluateDefinition,
  Finally,
  FinallyDefinition,
  For,
  ForDefinition,
  If,
  IfDefinition,
  Init,
  InitDefinition,
  Jump,
  JumpDefinition,
  Log,
  LogDefinition,
  Loop,
  LoopDefinition,
  Next,
  NextDefinition,
  Parameters,
  ParametersDefinition,
  RestoreHeap,
  Retry,
  RetryDefinition,
  Return,
  ReturnDefinition,
  Steps,
  StepsDefinition,
  Throw,
  ThrowDefinition,
  Try,
  TryDefinition,
  Wait,
  WaitDefinition,
} from '../instructions';
import { Serializer } from './serializer';
import { JSONSerializer } from './json';
import { SerializerFailure } from './failures';
import { MemorySerializer } from './memory';
import { ChainSerializers } from './chain';

// TODO: we'll need to refactor all our instructions at some point, not sure how just yet.
// the problem is that a lot of their data is spread out between framework, the individual instructions, and now the serializer for those instructions
export class InstructionsSerializer
  implements Serializer<Stack<Instruction>, string[]>
{
  private readonly serializer: Serializer<Instruction, string>;

  constructor() {
    const json = new JSONSerializer<SerializedInstruction>();
    const instruction = new InstructionSerializer();

    this.serializer = new ChainSerializers(instruction, json);
  }

  serialize(instructions: Stack<Instruction>): string[] {
    const serialized: string[] = [];

    do {
      const instruction = instructions.pop();

      if (instruction) {
        serialized.push(this.serializer.serialize(instruction));
      }
    } while (!instructions.isEmpty());

    return serialized;
  }

  deserialize(items: string[]): Stack<Instruction> {
    const instructions = new Stack<Instruction>();

    do {
      const serialized = items.pop();

      if (serialized) {
        instructions.push(this.serializer.deserialize(serialized));
      }
    } while (items.length > 0);

    return instructions;
  }
}

export class InstructionSerializer
  implements Serializer<Instruction, SerializedInstruction>
{
  private readonly memory = new MemorySerializer();

  serialize(instruction: Instruction): SerializedInstruction {
    const payload = { ...instruction };

    // TODO: more unit tests around restoration of heaps
    if (instruction instanceof RestoreHeap) {
      payload.definition = this.memory.serialize(instruction.definition);
    }

    return { type: payload.type, definition: payload.definition };
  }

  deserialize(serialized: SerializedInstruction): Instruction {
    if (serialized.type === 'assign') {
      return new Assign(serialized.definition as AssignDefinition);
    }
    if (serialized.type === 'assignment') {
      return new Assignment(serialized.definition as AssignmentDefinition);
    }
    if (serialized.type === 'break') {
      return new Break();
    }
    if (serialized.type === 'call') {
      return new Call(serialized.definition as CallDefinition);
    }
    if (serialized.type === 'catch') {
      return new Catch(serialized.definition as CatchDefinition);
    }
    if (serialized.type === 'continue') {
      return new Continue();
    }
    if (serialized.type === 'copy') {
      return new Copy(serialized.definition as CopyDefinition);
    }
    if (serialized.type === 'end') {
      return new End();
    }
    if (serialized.type === 'for') {
      return new For(serialized.definition as ForDefinition);
    }
    if (serialized.type === 'jump') {
      return new Jump(serialized.definition as JumpDefinition);
    }
    if (serialized.type === 'if') {
      return new If(serialized.definition as IfDefinition);
    }
    if (serialized.type === 'init') {
      return new Init(serialized.definition as InitDefinition);
    }
    if (serialized.type === 'loop') {
      return new Loop(serialized.definition as LoopDefinition);
    }
    if (serialized.type === 'next') {
      return new Next(serialized.definition as NextDefinition);
    }
    if (serialized.type === 'parameters') {
      return new Parameters(serialized.definition as ParametersDefinition);
    }
    if (serialized.type === 'restore') {
      const heap = this.memory.deserialize(
        serialized.definition as Record<string, string>
      );
      return new RestoreHeap(heap);
    }
    if (serialized.type === 'return') {
      return new Return(serialized.definition as ReturnDefinition);
    }
    if (serialized.type === 'steps') {
      return new Steps(serialized.definition as StepsDefinition);
    }
    if (serialized.type === 'try') {
      return new Try(serialized.definition as TryDefinition);
    }
    if (serialized.type === 'log') {
      return new Log(serialized.definition as LogDefinition);
    }
    if (serialized.type === 'delay') {
      return new Delay(serialized.definition as DelayDefinition);
    }
    if (serialized.type === 'wait') {
      return new Wait(serialized.definition as WaitDefinition);
    }
    if (serialized.type === 'throw') {
      return new Throw(serialized.definition as ThrowDefinition);
    }
    if (serialized.type === 'retry') {
      return new Retry(serialized.definition as RetryDefinition);
    }
    if (serialized.type === 'finally') {
      return new Finally(serialized.definition as FinallyDefinition);
    }
    if (serialized.type === 'evaluate') {
      return new Evaluate(serialized.definition as EvaluateDefinition);
    }
    console.error('encountered unrecognized instruction', serialized);
    throw new SerializerFailure({
      code: 'unrecognized-instruction',
      data: serialized,
    });
  }
}
