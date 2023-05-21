import { Context, Instruction } from '../framework';
import { Steps, StepsDefinition } from './steps';

export type LoopDefinition = {
  for: string;
  index: string;
  value: string;
  steps: StepsDefinition[];
};

export class Loop implements Instruction {
  private readonly definition: LoopDefinition;
  constructor(def: LoopDefinition) {
    this.definition = def;
  }

  async process({ memory, instructions }: Context): Promise<void> {
    const {
      for: listAddress,
      index: indexAddress,
      value: valueAddress,
      steps,
    } = this.definition;
    // get current iteration
    const index: number = memory.has(indexAddress)
      ? memory.get(indexAddress) + 1
      : 0;

    const iterable = memory.get(listAddress);
    if (index >= iterable.length) {
      return; // loop terminate
    }

    // assign value and current index into memory for next instruction
    const value = iterable[index];
    memory.put(valueAddress, value);
    memory.put(indexAddress, index);

    // execute steps and loop
    instructions.push(new Loop(this.definition));
    instructions.push(new Steps(steps));
  }
}
