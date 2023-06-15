import { Stack } from '@worksheets/util/data-structures';
import { Instruction, SerializedInstruction } from '../framework';
import { ChainSerializers } from './chain';
import { InstructionSerializer } from './instruction';
import { JSONSerializer } from './json';
import { Serializer } from './serializer';

/**
 * reverses the order of the instructions when serializing and deserializing
 */
export class InstructionStackSerializer
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
