import { Address, Context, Instruction } from '../framework';
import { StepsDefinition, Steps } from './steps';

export type CatchDefinition = { address: Address; steps: StepsDefinition };

export class Catch implements Instruction {
  private readonly definition: CatchDefinition;
  constructor(def: CatchDefinition) {
    this.definition = def;
  }

  async process(ctx: Context): Promise<void> {
    if (ctx.register.failure.peek()) {
      const failure = ctx.register.failure.pop();
      const { address, steps } = this.definition;
      if (address) {
        ctx.memory.put(address, failure);
      }
      if (steps) {
        ctx.instructions.push(new Steps(steps));
      }
    }
  }
}
