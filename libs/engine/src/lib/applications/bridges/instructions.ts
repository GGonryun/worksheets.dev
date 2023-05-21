import {
  ApplicationExecutionPayload,
  ApplicationRegistry,
} from '../applications';

export type ApplicationEvaluator = (
  path: string,
  input: unknown
) => Promise<unknown>;

export interface InstructionsBridge {
  run: ApplicationEvaluator;
}

export class LoggingInstructionsBridge implements InstructionsBridge {
  async run(path: string, input: unknown) {
    console.log('executing application at path with input', path, input);
    return;
  }
}
export class UnimeplementedInstructionsBridge implements InstructionsBridge {
  async run() {
    throw new Error(
      'an application bridge for call expressions has not been configured yet'
    );
  }
}

export class InstructionsApplicationBridge implements InstructionsBridge {
  private readonly registry: ApplicationRegistry;
  constructor(registry: ApplicationRegistry) {
    this.registry = registry;
  }
  async run(path: string, input: unknown): Promise<unknown> {
    const args: ApplicationExecutionPayload<unknown> = { path, input: [] };
    if (input != null) {
      args.input = [input];
    }
    return await this.registry.run(args);
  }
}

export class LibraryProcessor {
  private readonly bridge: InstructionsBridge;
  constructor(bridge?: InstructionsBridge) {
    this.bridge = bridge ?? new UnimeplementedInstructionsBridge();
  }
  async run(path: string, input: unknown): Promise<unknown> {
    return await this.bridge.run(path, input);
  }
}
