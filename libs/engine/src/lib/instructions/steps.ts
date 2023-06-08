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
import { Halt } from './halt';

export type StepsDefinition = Definition[];

export class Steps implements Instruction {
  private readonly definition: StepsDefinition;
  /**
   * Execute a sequential set of actions. A step can include instructions: call, try, for, assign, return, switch, parallel_for, parallel_steps and steps. The steps instruction will immediately place all of its instructions on the stack. When any step fails a failure is placed in the registry. Use a try-catch for error handling.
   *
   * @param def an unknown list of steps to execute. throws an error if the list is empty or undefined.
   */
  constructor(def: StepsDefinition) {
    this.definition = def;
  }

  async process(ctx: Context): Promise<void> {
    if (!this.definition) {
      throw new ExecutionFailure({
        code: 'invalid-instruction',
        message: 'instruction definition schema is required',
      });
    }
    const steps = cloneDeep(this.definition).reverse();
    for (const step of steps) {
      let instruction: Instruction | undefined;
      if (isDefinition<{ steps: StepsDefinition }>(step, 'steps')) {
        instruction = new Steps(step.steps);
      }
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
      if (isDefinition(step, 'halt')) {
        instruction = new Halt();
      }
      if (!instruction) {
        console.error(`unfamiliar instruction`, instruction);
        throw new ExecutionFailure({
          code: 'invalid-instruction',
          message: `encountered an unfamiliar instruction`,
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
