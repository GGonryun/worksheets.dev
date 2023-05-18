import { Context, Instruction } from './framework';

export type ParallelStepsDefinition = unknown;

export class ParallelSteps implements Instruction {
  private readonly definition: ParallelStepsDefinition;
  constructor(def: ParallelStepsDefinition) {
    this.definition = def;
  }

  process(ctx: Context): void {
    throw new Error('unimplemented');
  }
}
