import { Context, Instruction } from '../framework';

export class End implements Instruction {
  async process({ instructions }: Context): Promise<void> {
    while (!instructions.isEmpty()) {
      instructions.pop();
    }
  }
}
