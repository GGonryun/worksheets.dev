import { Context, Instruction } from '../framework';
import { Steps, StepsDefinition } from './steps';

export type LoopDefinition = {
  // address of the list to iterate, while this may seem strange at first it allows for
  // the list to be mutated during the loop and it allows refernces to extremely large
  // data sets.
  for: string;
  index: string;
  value: string;
  steps: StepsDefinition[];
};

export class Loop implements Instruction {
  readonly type = 'loop';
  readonly definition: LoopDefinition;
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
    const index: number = memory.hasData(indexAddress)
      ? memory.getData(indexAddress) + 1
      : 0;

    const iterable = memory.getData(listAddress);
    if (index >= iterable.length) {
      return; // loop terminate
    }

    // assign value and current index into memory for next instruction
    const value = iterable[index];
    memory.putData(valueAddress, value);
    memory.putData(indexAddress, index);

    // execute steps and loop
    instructions.push(new Loop(this.definition));
    instructions.push(new Steps(steps));
  }
}
