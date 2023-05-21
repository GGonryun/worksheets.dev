import {
  ScriptsApplicationBridge,
  InstructionsApplicationBridge,
  InstructionsBridge,
} from './bridges';
import { CallExpressionBridge } from '../scripts';
import { ApplicationRegistry, UnimplementedRegistry } from './registries';

// the payload an app requires to execute.
export type ApplicationExecutionPayload<T> = {
  path: string;
  input: T[];
};

// runs an app.
export type ApplicationExecutor<I, O> = (
  opts: ApplicationExecutionPayload<I>
) => Promise<O>;

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
