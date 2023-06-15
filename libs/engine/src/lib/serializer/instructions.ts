import { Instructions, StackLimits } from '../framework';
import { Serializer } from './serializer';
import { InstructionStackSerializer } from './instruction-stack';

export class InstructionsSerializer
  implements Serializer<Instructions, string[]>
{
  private readonly serializer: InstructionStackSerializer;
  private readonly limits: StackLimits;
  constructor(limits: StackLimits = { max: 100 }) {
    this.serializer = new InstructionStackSerializer();
    this.limits = limits;
  }

  serialize(instructions: Instructions): string[] {
    const stack = instructions.stack();
    return this.serializer.serialize(stack);
  }

  deserialize(serialized: string[]): Instructions {
    const stack = this.serializer.deserialize(serialized);
    return new Instructions(stack, this.limits);
  }
}
