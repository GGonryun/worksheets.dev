/**
 * @module Wait
 * @description used to wait for a specified amount of time before continuing execution, calculated in milliseconds.
 * @throws {HandlerFailure} if the wait duration exceeds 5 minutes.
 */

import { ExecutionFailure } from '../failures';
import { Context, Instruction } from '../framework';
import { Delay } from './delay';

export type WaitDefinition = { wait: number }; // milliseconds

export class Wait implements Instruction {
  readonly type = 'wait';
  readonly definition: WaitDefinition;
  constructor(def: WaitDefinition) {
    this.definition = def;
  }

  async process(ctx: Context): Promise<void> {
    //cannot process negative waits
    if (this.definition.wait < 0) {
      // throws an execution failure
      throw new ExecutionFailure({
        code: 'invalid-instruction',
        message: 'Wait duration cannot be negative',
      });
    }

    // cannot process a wait if the duration is longer than an hour
    if (this.definition.wait > 3600000) {
      // throws an execution failure
      throw new ExecutionFailure({
        code: 'invalid-instruction',
        message: 'Wait duration cannot exceed one hour',
      });
    }

    // calculate the offset and push a delay instruction onto the stack
    const offset = Date.now() + this.definition.wait;
    ctx.instructions.push(new Delay(offset));
  }
}