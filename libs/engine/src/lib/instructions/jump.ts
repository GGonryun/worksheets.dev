import { Instruction } from '../framework';

export type JumpDefinition = unknown;

export class Jump implements Instruction {
  async process(): Promise<void> {
    throw new Error('unimplemented');
  }
}
