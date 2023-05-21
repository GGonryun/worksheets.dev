import { Context, Instruction } from '../framework';
import { ExecutionFailure } from '../failures';
import { cloneDeep, isObject } from 'lodash';
import { Assign, AssignDefinition } from './assign';
import { Definition } from './definition';
import { Call, CallDefinition } from './call';
import { Return, ReturnDefinition } from './return';
import { If, IfDefinition } from './if';
import { For, ForDefinition } from './for';
import { Try, TryDefinition } from './try';

export type StepsDefinition = Definition[];

export class Steps implements Instruction {
  private readonly definition: StepsDefinition;
  /**
   * Execute a sequential set of actions. A step can include instructions: call, try, for, assign, return, break, continue, switch, parallel_for, parallel_steps and steps. The steps instruction will immediately place all of its instructions on the stack. when any step fails a failure is placed in the registry.
   * @param def
   */
  constructor(def: StepsDefinition) {
    this.definition = def;
  }

  async process(ctx: Context): Promise<void> {
    if (!this.definition) {
      throw new ExecutionFailure({
        code: 'invalid-operation',
        message: 'steps instruction is missing a definition',
        context: ctx,
        definition: this.definition,
      });
    }
    // execute a sequential set of actions.
    // reverse steps before executing them so that they enter the stack in the correct order.
    const steps = cloneDeep(this.definition).reverse();
    for (const step of steps) {
      let instruction: Instruction | undefined;
      // TODO: how to detect a steps types?
      if (isDefinition<AssignDefinition>(step, 'assign')) {
        instruction = new Assign(step);
      }
      if (isDefinition<CallDefinition>(step, 'call')) {
        instruction = new Call(step);
      }
      if (isDefinition<{ return: ReturnDefinition }>(step, 'return')) {
        instruction = new Return(step.return);
      }
      if (isDefinition<{ switch: IfDefinition }>(step, 'switch')) {
        instruction = new If(step.switch);
      }
      if (isDefinition<ForDefinition>(step, 'for')) {
        instruction = new For(step);
      }
      if (isDefinition<TryDefinition>(step, 'try')) {
        instruction = new Try(step);
      }
      if (!instruction) {
        throw new ExecutionFailure({
          code: 'unrecognized-step',
          message: `steps instruction encountered a definition we did not recognize ${JSON.stringify(
            step
          )}`,
          context: ctx,
          definition: this.definition,
          data: { step },
        });
      }
      ctx.instructions.push(instruction);
    }
  }
}

function isDefinition<T>(
  definition: Definition,
  key: keyof T
): definition is T {
  if (isObject(definition) && key in definition) {
    return true;
  }
  return false;
}
