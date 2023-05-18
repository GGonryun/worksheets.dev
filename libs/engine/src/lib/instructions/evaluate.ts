import { Context, Instruction } from './framework';

export type EvaluateDefinition = unknown;

export class Evaluate implements Instruction {
  private readonly definition: EvaluateDefinition;
  constructor(def: EvaluateDefinition) {
    this.definition = def;
  }

  process(ctx: Context): void {
    throw new Error('unimplemented');
  }
}
