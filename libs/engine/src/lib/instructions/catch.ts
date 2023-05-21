import { Address, Context, Instruction } from '../framework';
import { StepsDefinition, Steps } from './steps';
import { DomainFailure } from '../failures';

export type CatchDefinition = { assign: Address; steps: StepsDefinition };

export class Catch implements Instruction {
  private readonly definition: CatchDefinition;
  constructor(def: CatchDefinition) {
    this.definition = def;
  }

  async process(ctx: Context): Promise<void> {
    if (ctx.register.failure.peek()) {
      const failure = ctx.register.failure.pop();
      const { assign: address, steps } = this.definition;
      if (address && failure) {
        const known = new DomainFailure(failure);
        ctx.memory.put(address, known);
      }
      if (steps) {
        ctx.instructions.push(new Steps(steps));
      }
    }
  }
}
