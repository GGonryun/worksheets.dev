import { isExpression } from '../util';
import { Address, Instruction, Context } from '../framework';

export type EvaluateDefinition = { address: Address; expression: string };

export class Evaluate implements Instruction {
  private readonly definition: EvaluateDefinition;
  /**
   * Evaluates an expression and stores it's result at an address in memory.
   *
   * @param def the string to evaluate and the address in memory to store the result
   */
  constructor(def: EvaluateDefinition) {
    this.definition = def;
  }

  async process(ctx: Context): Promise<void> {
    const { expression, address } = this.definition;
    let value;
    if (isExpression(expression)) {
      value = ctx.scripts.evaluate(expression);
    } else {
      value = ctx.scripts.parse(expression);
    }
    ctx.memory.put(address, value);
  }
}
