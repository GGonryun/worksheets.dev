import { isObject, isString } from 'lodash';
import { Context, Instruction } from '../framework';
export type ReturnDefinition =
  | number
  | string
  | Record<string, string | number>;

export class Return implements Instruction {
  private readonly definition: ReturnDefinition;
  constructor(def: ReturnDefinition) {
    this.definition = def;
  }
  async process({ register, scripts }: Context): Promise<void> {
    register.output = await scripts.recursiveParse(this.definition);
  }
}
