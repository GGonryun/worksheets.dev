import { Context, Instruction } from './framework';

export type StepsDefinition = unknown;

export class Steps implements Instruction {
  private readonly definition: StepsDefinition;
  constructor(def: StepsDefinition) {
    this.definition = def;
  }

  process(ctx: Context): void {
    throw new Error('unimplemented');
  }
}
