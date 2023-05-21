import { isEqual } from 'lodash';
import {
  ScriptsApplicationBridge,
  InstructionsApplicationBridge,
  InstructionsBridge,
} from './bridges';
import { CallExpressionBridge } from '../scripts';

// the payload an app requires to execute.
export type ApplicationExecutionPayload<T> = {
  path: string;
  input: T[];
};
// runs an app.
export type ApplicationExecutor<I, O> = (
  opts: ApplicationExecutionPayload<I>
) => Promise<O>;

// TODO: create a real application registry.
export interface ApplicationRegistry {
  run: ApplicationExecutor<unknown, unknown>;
}

export class CustomRegistry implements ApplicationRegistry {
  runFn: ApplicationExecutor<unknown, unknown>;
  constructor(fn: ApplicationExecutor<unknown, unknown>) {
    this.runFn = fn;
  }
  async run(opts: ApplicationExecutionPayload<unknown>): Promise<unknown> {
    return await this.runFn(opts);
  }
}

export class LoggingRegistry implements ApplicationRegistry {
  async run(opts: ApplicationExecutionPayload<unknown>): Promise<unknown> {
    console.log('executing an application', opts);
    return;
  }
}

export class UnimplementedRegistry implements ApplicationRegistry {
  async run() {
    throw new Error('an application registry has not been set');
  }
}

export type MockRegistryResponses = Record<
  string,
  { input: unknown; output: unknown }
>;

export class MockRegistry extends CustomRegistry {
  constructor(opts: MockRegistryResponses) {
    super(async ({ path, input }) => {
      for (const key in opts) {
        if (path != key) continue;
        const test = opts[key];
        if (!isEqual(input, test.input)) throw new Error('input should match');
        return test.output;
      }
      return undefined;
    });
  }
}

export class ApplicationLibrary {
  private readonly registry: ApplicationRegistry;
  constructor(registry?: ApplicationRegistry) {
    this.registry = registry ?? new UnimplementedRegistry();
  }
  instructionsBridge(): InstructionsBridge {
    return new InstructionsApplicationBridge(this.registry);
  }
  scriptsBridge(): CallExpressionBridge {
    return new ScriptsApplicationBridge(this.registry);
  }
}
