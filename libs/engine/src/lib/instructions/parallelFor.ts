import { Instruction } from '../framework';

export type ParallelForDefinition = unknown;

export class ParallelFor implements Instruction {
  async process(): Promise<void> {
    throw new Error('unimplemented');
  }
}
