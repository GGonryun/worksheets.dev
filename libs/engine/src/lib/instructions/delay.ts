import { prettyPrintMilliseconds, waitFor } from '@worksheets/util/time';
import { Context, Instruction } from '../framework';
import { ExecutionFailure } from '../failures';

export type DelayDefinition = number; // timestamp to delay until

export class Delay implements Instruction {
  readonly type = 'delay';
  readonly definition: DelayDefinition;
  constructor(def: DelayDefinition) {
    this.definition = def;
  }

  async process(ctx: Context): Promise<void> {
    const start = Date.now();
    // check how much time is left
    const duration = this.definition - start;

    // check if duration is longer than 1 minute.
    if (duration > 60 * 1000) {
      // use a retry failure to delay the execution
      ctx.controller.cancel(
        new ExecutionFailure({
          code: 'retry',
          message: 'Task delay exceeded 1 minute',
          data: {},
          delay: this.definition,
        })
      );

      // push the delay instruction back onto the stack
      ctx.instructions.push(this);

      return;
    }

    // check if the delay is still active
    if (start < this.definition) {
      // calculate the wait time offset
      const offset = this.definition - Date.now();
      // wait for a random interval up to 10 seconds or the offset whichever is smaller
      const wait = Math.min(Math.random() * 10000, offset);
      // log that we're gonna wait
      ctx.logger.trace(`Execution paused for ${prettyPrintMilliseconds(wait)}`);
      await waitFor(wait);
      // push the delay instruction back onto the stack
      ctx.instructions.push(this);

      // do not factor waits into the duration
      ctx.register.duration = (ctx.register.duration ?? 0) - wait;
      return;
    }
  }
}
