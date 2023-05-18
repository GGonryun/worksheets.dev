import { Context, Instruction } from './framework';

export type JumpDefinition = unknown;

export class Jump implements Instruction {
  private readonly definition: JumpDefinition;
  constructor(def: JumpDefinition) {
    this.definition = def;
  }

  process(ctx: Context): void {
    throw new Error('unimplemented');
  }
}
