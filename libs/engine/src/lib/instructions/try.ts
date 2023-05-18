import { Context, Instruction } from './framework';

export type TryDefinition = unknown;

export class Try implements Instruction {
  private readonly definition: TryDefinition;
  constructor(def: TryDefinition) {
    this.definition = def;
  }

  process(ctx: Context): void {
    throw new Error('unimplemented');
  }
}
