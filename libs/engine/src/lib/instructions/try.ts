import { ExecutionFailure } from '../failures';
import { Catch, CatchDefinition } from './catch';
import { Context, Instruction } from '../framework';
import { RestoreScope } from './restore-scope';
import { Steps, StepsDefinition } from './steps';
import { Retry, RetryDefinition } from './retry';
import { Finally, FinallyDefinition } from './finally';
import { CreateScope } from './create-scope';

export type TryDefinition = {
  try: { steps: StepsDefinition };
  catch: CatchDefinition;
  finally: FinallyDefinition;
  retry: RetryDefinition;
};

export class Try implements Instruction {
  readonly type = 'try';
  readonly definition: TryDefinition;
  constructor(def: TryDefinition) {
    this.definition = def;
  }

  async process(ctx: Context): Promise<void> {
    const { instructions } = ctx;
    const def = this.definition;

    if (!def.try || !def.try.steps) {
      throw new ExecutionFailure({
        code: 'invalid-instruction',
        message: `The 'try' instruction is missing required parameter: 'steps'`,
      });
    }

    if (def.catch && def.retry) {
      throw new ExecutionFailure({
        code: 'invalid-instruction',
        message: `The 'try' instruction cannot have both 'catch' and 'retry'`,
      });
    }

    if (def.retry && def.finally) {
      throw new ExecutionFailure({
        code: 'invalid-instruction',
        message: `The 'try' instruction cannot have both 'retry' and 'finally'`,
      });
    }

    instructions.push(new RestoreScope());

    if (def.finally) {
      instructions.push(new Finally(def.finally));
    }

    if (def.retry) {
      instructions.push(
        new Retry({
          steps: def.try.steps,
          if: def.retry.if,
          assign: def.retry.assign ?? 'error',
          attempts: def.retry.attempts ?? 1,
          delay: def.retry.delay ?? 0,
          limit: def.retry.limit ?? 60 * 1000,
          multiplier: def.retry.multiplier ?? 1,
        })
      );
    }

    if (def.catch) {
      instructions.push(new Catch(def.catch));
    }

    instructions.push(new Steps(def.try.steps));

    instructions.push(new CreateScope());
  }
}
