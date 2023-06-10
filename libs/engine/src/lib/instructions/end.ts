import { Context, Instruction } from '../framework';

export class End implements Instruction {
  readonly type = 'end';
  readonly definition = undefined;
  async process({ instructions }: Context): Promise<void> {
    while (!instructions.isEmpty()) {
      instructions.pop();
    }
  }
}
