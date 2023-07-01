import { MethodCallFailure } from '@worksheets/apps/framework';
import { ExecutionFailure } from '../failures';
import { Context, Instruction } from '../framework';
import { getReasonPhrase } from 'http-status-codes';

export type ThrowDefinition = {
  throw: number | { code: number; message: string };
};

export class Throw implements Instruction {
  readonly type = 'wait';
  readonly definition: ThrowDefinition;
  constructor(def: ThrowDefinition) {
    this.definition = def;
  }

  async process(ctx: Context): Promise<void> {
    // if the throw is a number then throw the number as the method failure's code
    if (typeof this.definition.throw === 'number') {
      ctx.register.failure = new MethodCallFailure({
        code: this.definition.throw,
        message: getReasonPhrase(this.definition.throw),
      });
    }
    // if the throw is an object then throw the properties
    else if (typeof this.definition.throw === 'object') {
      ctx.register.failure = new MethodCallFailure({
        code: this.definition.throw.code,
        message: this.definition.throw.message,
      });
    } else {
      ctx.controller.cancel(
        new ExecutionFailure({
          code: 'invalid-instruction',
          message: 'Throw instruction was called with unknown parameters',
        })
      );
    }
  }
}
