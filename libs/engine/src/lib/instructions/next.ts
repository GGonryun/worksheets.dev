import { Context, Instruction } from '../framework';
import { ExecutionFailure } from '../failures';
import { End } from './end';
import { Continue } from './continue';
import { Break } from './break';

export type NextDefinition = 'end' | 'continue' | 'break' | string;

export class Next implements Instruction {
  private readonly definition: NextDefinition;
  /**
   * Next is used to specify a control operation such as "end" or "break" or "continue".
   *
   * In a for loop, 'next' can be used to break or terminate operation.
   * In an if statement, 'next' can be used to terminate execution early.
   *
   * @param definition of the next operation we should jump to.
   */
  constructor(definition: NextDefinition) {
    this.definition = definition;
  }

  async process(context: Context): Promise<void> {
    const { instructions } = context;
    const { definition } = this;
    switch (definition) {
      case 'end':
        instructions.push(new End());
        return;
      case 'continue':
        instructions.push(new Continue());
        return;
      case 'break':
        instructions.push(new Break());
        return;
    }
    throw new ExecutionFailure({
      code: 'invalid-instruction',
      message: `Next instruction received an unexpected operation: ${definition}`,
    });
  }
}
