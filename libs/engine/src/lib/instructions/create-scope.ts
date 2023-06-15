import { Context, Instruction } from '../framework';

export type CreateScopeDefinition = { private?: boolean } | undefined;
export class CreateScope implements Instruction {
  static type = 'create-scope';
  readonly type: string = CreateScope.type;
  readonly definition: CreateScopeDefinition;
  constructor(def?: CreateScopeDefinition) {
    this.definition = def;
  }

  async process(ctx: Context): Promise<void> {
    if (this.definition?.private) {
      ctx.memory.newScope();
    } else {
      ctx.memory.createLayer();
    }
  }
}
