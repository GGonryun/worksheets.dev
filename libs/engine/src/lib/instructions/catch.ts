import { Address, Context, Instruction } from '../framework';
import { StepsDefinition, Steps } from './steps';

export type CatchDefinition = { assign: Address; steps: StepsDefinition };

export class Catch implements Instruction {
  private readonly definition: CatchDefinition;
  constructor(def: CatchDefinition) {
    this.definition = def;
  }

  async process(ctx: Context): Promise<void> {
    const failure = ctx.register.failure;
    if (failure) {
      const failure = ctx.register.failure;
      const { assign: address, steps } = this.definition;
      if (address && failure) {
        ctx.memory.put(address, failure.toSimple());
      }
      if (steps) {
        ctx.instructions.push(new Steps(steps));
      }
      ctx.register.failure = undefined;
    }
  }
}
