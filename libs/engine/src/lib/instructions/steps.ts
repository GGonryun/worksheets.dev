import { Context, Instruction } from '../framework';
import { ExecutionFailure } from '../failures';

export type StepsDefinition = unknown[];

export class Steps implements Instruction {
  private readonly definition: StepsDefinition;
  constructor(def: StepsDefinition) {
    this.definition = def;
  }

  async process(ctx: Context): Promise<void> {
    // execute a sequential set of actions.
    for (const step of this.definition) {
      let instruction: Instruction | undefined;
      // TODO: how to detect a steps types?
      // if (step) {
      //   instruction = new Assign(step);
      // }

      if (!instruction) {
        throw new ExecutionFailure({
          code: 'unrecognized-step',
          message:
            'steps instruction encountered a definition we did not recognize',
          context: ctx,
          definition: this.definition,
          data: { unrecognized: step },
        });
      }
      ctx.instructions.push(instruction);
    }
  }
}

//Execute a sequential set of actions. A step can include instructions: call, try, for, assign, return, break, continue, switch, parallel_for, parallel_steps and steps. The steps instruction will immediately place all of its instructions on the stack. when any step fails a failure is placed in the registry.
