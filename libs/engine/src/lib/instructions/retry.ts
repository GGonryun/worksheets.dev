import { ExecutionFailure } from '../failures';
import { Context, Instruction } from '../framework';
import { Steps, StepsDefinition } from './steps';
import { Wait } from './wait';

export type RetryDefinition = {
  attempts: number;
  if: string; // expression
  steps: StepsDefinition;
  assign: string; // where to put the error
  delay: number; // how long to wait before retrying
  limit: number; // max amount of time for each delay.
  multiplier: number; // how much to multiply the delay by each time
};

export class Retry implements Instruction {
  readonly type = 'retry';
  readonly definition: RetryDefinition;
  constructor(def: RetryDefinition) {
    this.definition = def;
  }

  async process(ctx: Context): Promise<void> {
    const { instructions, register } = ctx;
    const {
      attempts,
      steps,
      assign: address,
      delay,
      limit,
      multiplier,
    } = this.definition;

    // skip this instruction if the failure does not exist
    const failure = register.failure;
    if (!failure) {
      return;
    }

    // skip this instruction if there are no more attempts left.
    if (attempts < 1) {
      ctx.logger.warn(`Task exhausted retry attempts`, { attempts });
      return;
    }

    // do not allow more than 100 retries
    if (attempts > 100) {
      ctx.controller.cancel(
        new ExecutionFailure({
          code: 'invalid-instruction',
          message: `The 'retry' instruction cannot have more than 100 attempts.`,
        })
      );
    }

    // move failure into memory for script parsing.
    ctx.memory.put(address, failure.toSimple());

    // check to see if the predicate evaluates to true
    if (this.definition.if) {
      const result = await ctx.scripts.parse(this.definition.if);
      if (!result) {
        ctx.logger.trace(
          `Task cannot handle error, retry predicate evaluated to false`
        );
        return;
      }
    }

    ctx.logger.info(`Task failed, retrying ${attempts} more times`);

    const computedDelay = Math.min(delay * multiplier, limit);
    instructions.push(
      new Retry({
        attempts: attempts - 1,
        if: this.definition.if, // pass the original expression
        steps: steps,
        assign: address,
        delay: computedDelay,
        limit: limit,
        multiplier: multiplier,
      })
    );

    instructions.push(new Steps(this.definition.steps));
    ctx.register.failure = undefined;
    // if we have a delay push a new wait instruction onto the stack
    // waits are used to calculate a delay from a millisecond value
    if (delay) {
      ctx.logger.trace(`Task failed, retrying after ${delay}ms delaya`);
      instructions.push(new Wait({ wait: delay }));
    }
  }
}
