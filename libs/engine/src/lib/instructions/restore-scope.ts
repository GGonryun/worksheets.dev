import { Context, Instruction } from '../framework';

export type RestoreScopeDefinition = { private?: boolean } | undefined;

export class RestoreScope implements Instruction {
  static type = 'restore-scope';
  readonly type: string = RestoreScope.type;
  readonly definition: RestoreScopeDefinition;
  constructor(def?: RestoreScopeDefinition) {
    this.definition = def;
  }

  async process(ctx: Context): Promise<void> {
    if (this.definition?.private) {
      ctx.memory.dropScope();
    } else {
      ctx.memory.deleteLayer();
    }
  }
}
