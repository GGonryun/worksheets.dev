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
import { Jump, JumpDefinition } from './jump';
import { Log, LogDefinition } from './log';
import { Wait, WaitDefinition } from './wait';
import { Throw, ThrowDefinition } from './throw';
import { Worksheet, WorksheetDefinition } from './worksheet';

export type StepsDefinition = Definition[];

export class Steps implements Instruction {
  readonly type = 'steps';
  readonly definition: StepsDefinition;
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
      if (isDefinition<{ assign: AssignDefinition }>(step, 'assign')) {
        instruction = new Assign(step.assign);
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
      if (isDefinition<JumpDefinition>(step, 'jump')) {
        instruction = new Jump(step);
      }
      if (isDefinition<LogDefinition>(step, 'log')) {
        instruction = new Log(step);
      }
      if (isDefinition<WaitDefinition>(step, 'wait')) {
        instruction = new Wait(step);
      }
      if (isDefinition<ThrowDefinition>(step, 'throw')) {
        instruction = new Throw(step);
      }
      if (isDefinition<WorksheetDefinition>(step, 'worksheet')) {
        instruction = new Worksheet(step);
      }
      if (!instruction) {
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
