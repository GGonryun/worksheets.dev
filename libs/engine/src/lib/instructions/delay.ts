import { waitFor } from '@worksheets/util/time';
import { Context, Instruction } from '../framework';
import { randomBetween } from '@worksheets/util/numbers';

export type DelayDefinition = number; // timestamp to delay until

export class Delay implements Instruction {
  readonly type = 'delay';
  readonly definition: DelayDefinition;
  constructor(def: DelayDefinition) {
    this.definition = def;
  }

  async process(ctx: Context): Promise<void> {
    // check if the timestamp has passed
    if (Date.now() < this.definition) {
      // calculate the wait time offset
      const wait = this.definition - Date.now();
      // wait for 1~2 seconds or the offset whichever is smaller
      await waitFor(Math.min(randomBetween(1000, 2000), wait));
      // push the delay instruction back onto the stack
      ctx.instructions.push(this);
    }
  }
}
