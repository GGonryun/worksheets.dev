import { ExecutionFailure } from '../failures';
import { Catch, CatchDefinition } from './catch';
import { Context, Instruction } from '../framework';
import { RestoreHeap } from './restoreHeap';
import { Steps, StepsDefinition } from './steps';

export type TryDefinition = {
  try: { steps: StepsDefinition };
  catch: CatchDefinition;
  finally: { steps: StepsDefinition };
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
      instructions.push(new Steps(def.finally.steps));
    }
    if (def.catch) {
      instructions.push(new Catch(def.catch));
    }
    instructions.push(new Steps(def.try.steps));
  }
}
