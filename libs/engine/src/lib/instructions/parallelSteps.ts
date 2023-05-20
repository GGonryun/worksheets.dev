import { Instruction } from '../framework';

export type ParallelStepsDefinition = unknown;

export class ParallelSteps implements Instruction {
  async process(): Promise<void> {
    throw new Error('unimplemented');
  }
}
