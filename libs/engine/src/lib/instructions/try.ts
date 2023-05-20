import { ExecutionFailure } from '../failures';
import { Catch } from './catch';
import { Address, Context, Instruction } from '../framework';
import { RestoreHeap } from './restoreHeap';
import { Steps, StepsDefinition } from './steps';

export type TryDefinition = {
  try: StepsDefinition;
  catch: Address;
  handle: StepsDefinition;
  finally: StepsDefinition;
};

export class Try implements Instruction {
  private readonly definition: TryDefinition;
  constructor(def: TryDefinition) {
    this.definition = def;
  }

  async process(ctx: Context): Promise<void> {
    const { memory, instructions } = ctx;
    const def = this.definition;
    if (!def.try) {
      throw new ExecutionFailure({
        code: 'missing-required-parameter',
        message: 'Try instruction cannot execute without steps defined.',
        context: ctx,
        definition: def,
      });
    }
    instructions.push(new RestoreHeap(memory.clone()));
    if (def.finally) {
      instructions.push(new Steps(def.finally));
    }
    if (def.catch || def.handle) {
      instructions.push(new Catch({ address: def.catch, steps: def.handle }));
    }
    instructions.push(new Steps(def.try));
  }
}
