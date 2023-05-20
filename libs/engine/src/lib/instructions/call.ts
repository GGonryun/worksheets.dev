import { isObject } from 'lodash';
import { ExecutionFailure } from '../failures';
import { Assignment } from './assignment';
import { Context, Instruction } from '../framework';

export type CallDefinition = { call: string; input?: unknown; output?: string };

export function isCallDefinition(
  definition: unknown
): definition is CallDefinition {
  if (!isObject(definition)) return false;
  if (!('call' in definition)) return false;
  return true;
}

export class Call implements Instruction {
  private readonly definition: CallDefinition;
  constructor(def: CallDefinition) {
    this.definition = def;
  }

  async process(ctx: Context): Promise<void> {
    try {
      const { call, input, output } = this.definition;
      const result = await executeMethod(call, input);
      if (output) {
        ctx.instructions.push(
          new Assignment({
            key: output,
            value: result,
          })
        );
      }
    } catch (error) {
      throw new ExecutionFailure({
        code: 'method-call-failure',
        message: `method execution failed unexpectedly`,
        cause: error,
        definition: this.definition,
        context: ctx,
      });
    }
  }
}

async function executeMethod(path: string, input: unknown) {
  console.log('TODO: call application registry.', path, input);
  return 'ok';
}
