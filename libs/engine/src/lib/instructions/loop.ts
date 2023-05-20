import { Context, Instruction } from '../framework';
import { Steps, StepsDefinition } from './steps';

export type LoopDefinition = {
  locators: { index: string; value: string; iterable: string };
  steps: StepsDefinition[];
};

export class Loop implements Instruction {
  private readonly definition: LoopDefinition;
  constructor(def: LoopDefinition) {
    this.definition = def;
  }

  async process({
    memory: { has, get, put },
    instructions: { push },
  }: Context): Promise<void> {
    const { locators, steps } = this.definition;
    // get current iteration
    let index: number = has(locators.index) ? get(locators.index) + 1 : 0;

    const iterable = get(locators.iterable);
    if (++index >= iterable.length) {
      return; // loop terminate
    }

    // assign value and current index into memory for next instruction
    const item = iterable[index];
    const value = item[index];
    put(locators.value, value);
    put(locators.index, index);

    // execute steps and loop
    push(new Loop(this.definition));
    push(new Steps(steps));
  }
}
