import { Context, Instruction } from '../framework';

export type AssignmentDefinition = {
  key: string;
  value: unknown;
};

export class Assignment implements Instruction {
  public readonly definition: AssignmentDefinition;
  public readonly type = 'assignment';
  constructor(def: AssignmentDefinition) {
    this.definition = def;
  }

  async process({ scripts, memory }: Context): Promise<void> {
    const { key, value: raw } = this.definition;
    const value = await scripts.recursiveParse(raw);
    memory.putData(key, value);
  }
}
