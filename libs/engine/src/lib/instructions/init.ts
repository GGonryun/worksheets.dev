import { Assign } from './assign';
import { Context, Instruction } from '../framework';
import { Parameters } from './parameters';
import { Return } from './return';
import { Definition } from './definition';
import { Steps } from './steps';
import { ExecutionFailure } from '../failures';

export type MethodMetadata = {
  version?: 1;
  name?: string;
  description?: string;
};

export type MultiMethodInitDefinition = {
  // the multi method must specify the "main" method
  main: SingleMethodInitDefinition;
  //and the rest of it's methods can have any name
  [key: string]: SingleMethodInitDefinition;
};

export type SingleMethodInitDefinition = {
  input: string;
  assign: { [key: string]: string }[];
  steps: Definition[];
  output: string | number; // if set, this means we're processing an inline worksheet and we will place our output in the heap's address space specified.
};

export type InitDefinition = MethodMetadata &
  (MultiMethodInitDefinition | SingleMethodInitDefinition);

export class Init implements Instruction {
  readonly type = 'init';
  readonly definition: InitDefinition;
  constructor(def: InitDefinition) {
    this.definition = def;
  }

  async process(ctx: Context): Promise<void> {
    if (!this.definition) {
      throw new ExecutionFailure({
        code: 'invalid-instruction',
        message: `cannot execute an empty worksheet`,
      });
    }

    // prefer key words to prevent possible infinite recursion with steps
    const {
      output: r,
      input: params,
      assign,
      steps,
    } = this.definition as SingleMethodInitDefinition;
    if (steps || r || assign || params) {
      if (r) {
        ctx.instructions.push(new Return(r));
      }
      if (steps) {
        ctx.instructions.push(new Steps(steps));
      }
      if (assign) {
        ctx.instructions.push(new Assign(assign));
      }
      if (params) {
        ctx.instructions.push(new Parameters(params));
      }

      return;
    }

    // has multiple methods defined
    if ('main' in this.definition) {
      const multiMethod = this.definition as MultiMethodInitDefinition;
      const main = multiMethod.main;
      if (!main) {
        throw new ExecutionFailure({
          code: 'invalid-instruction',
          message: `'init' instruction must have a 'main' method defined`,
        });
      }
      const mainInit = new Init({ ...main, name: 'main' });
      ctx.instructions.push(mainInit);
      const methods = Object.keys(multiMethod).filter((key) => key != 'main');
      methods.forEach((method) => {
        const def = multiMethod[method];
        ctx.references.add(method, def);
      });
      return;
    }

    throw new ExecutionFailure({
      code: 'invalid-instruction',
      message: `'init' instruction must have at least one required parameter set: 'return', 'steps', 'assign', 'params'`,
    });
  }
}
