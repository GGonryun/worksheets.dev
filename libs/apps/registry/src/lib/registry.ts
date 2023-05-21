import {
  ApplicationExecutionPayload,
  ApplicationRegistry,
} from '@worksheets/engine';
import { Heap } from '@worksheets/util-data-structures';
import {
  ApplicationDefinition,
  MethodDefinition,
} from '@worksheets/apps/framework';

export function appsRegistry(): string {
  return 'apps-registry';
}
/**
 * Connects to the official application registry for the Worksheets.Dev project
 */
export class OfficialRegistry implements ApplicationRegistry {
  async run(opts: ApplicationExecutionPayload<unknown>): Promise<unknown> {
    console.log('official registry executing', opts);

    return;
  }
}

// given an app. register it with the clerk.
// given a request. checkout the method from the clerk.
// then execute it using the Technician.

export class Clerk {
  private readonly memory: Heap;
  constructor() {
    this.memory = new Heap();
  }
  // register an application, take all the specified paths and assign them.
  register(application: ApplicationDefinition) {
    this.memory.putMulti(application.methods);
  }

  borrow(path: string) {
    this.memory.get(path);
  }
}

export class Technician<T extends MethodDefinition> {
  private readonly method: T;
  constructor(method: T) {
    this.method = method;
  }

  async process(raw: unknown): Promise<unknown> {
    const { method } = this;

    let input = undefined;
    if (method.input) {
      input = method.input.parse(raw);
    }

    const result = method.call({ input });

    if (method.output) {
      const output = method.output.parse(result);
      return output;
    }

    return;
  }
}
