import { Context, Instruction } from './framework';

export type LoopDefinition = unknown;

export class Loop implements Instruction {
  private readonly definition: LoopDefinition;
  constructor(def: LoopDefinition) {
    this.definition = def;
  }

  process(ctx: Context): void {
    throw new Error('unimplemented');
  }
}
