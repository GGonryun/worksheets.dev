import { isObject } from 'lodash';
import { Assignment } from './assignment';
import { Context, Instruction } from '../framework';
import { ZodError } from 'zod';
import { MethodCallFailure } from '@worksheets/apps/framework';
import { StatusCodes } from 'http-status-codes';

export type CallDefinition = { call: string; input?: unknown; output?: string };

export function isCallDefinition(
  definition: unknown
): definition is CallDefinition {
  if (!isObject(definition)) return false;
  if (!('call' in definition)) return false;
  return true;
}

export class Call implements Instruction {
  readonly type = 'call';
  readonly definition: CallDefinition;
  constructor(def: CallDefinition) {
    this.definition = def;
  }

  async process(ctx: Context): Promise<void> {
    const { call: path, input, output } = this.definition;
    const resolved = await ctx.scripts.recursiveParse(input);
    try {
      const result = await ctx.library.call(path, resolved);
      ctx.logger.trace(`Application method executed ${path}`);
      if (output) {
        ctx.instructions.push(
          new Assignment({
            key: output,
            value: result,
          })
        );
      }
    } catch (error) {
      if (error instanceof ZodError) {
        // TODO: create a more expressive zod error layer that makes it clearer what the error is.
        ctx.logger.error(
          `Application ${path} received a bad request. Click here to see more details.`,
          error
        );
        throw new MethodCallFailure({
          message: `method (${path}) failed to execute: ${error.message}`,
          code: StatusCodes.BAD_REQUEST,
          cause: error,
          data: { path },
        });
      }
      if (error instanceof MethodCallFailure) {
        ctx.logger.error(
          `[${error.code}] Application ${path} error: ${error.message}`,
          error
        );
      }
      throw error;
    }
  }
}
