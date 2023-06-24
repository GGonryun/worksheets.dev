import { MethodCallFailure, MethodDefinition } from './methods';

import { Heap } from '@worksheets/util/data-structures';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';
import { SettingType, Settings, parseSettings } from './settings';
import {} from '@worksheets/util/errors';

export type ApplicationDefinition = {
  id: string;
  logo: string; // url to app logo
  label: string;
  description: string;
  settings: Settings | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  methods: MethodDefinition<any, any, any>[];
};

export function newApplication(opts: ApplicationDefinition) {
  return opts;
}

export interface Library {
  call(path: string, ...inputs: unknown[]): Promise<unknown>;
}

export type ApplicationLibraryOptions = {
  clerk: Clerk;
  settingsLoader: SettingsLoader;
};

export type SettingsLoader = (
  app: string,
  methodId: string
) => Promise<Record<string, unknown>>;

export const methodPathSchema = z.object({
  appId: z.string(),
  methodId: z.string(),
});

export type MethodPathKey = string; // appId.methodId
export type ApplicationMethod = {
  app: ApplicationDefinition;
  method: MethodDefinition;
};
/**
 * Knows about all the applications and their methods
 * Knows how to execute methods
 * Knows how to load settings before executing a methods
 */
export class ApplicationLibrary {
  private readonly clerk: Clerk;
  private readonly settingsLoader: SettingsLoader;
  private readonly technician: Technician;
  constructor({ clerk, settingsLoader }: ApplicationLibraryOptions) {
    this.technician = new Technician();

    this.settingsLoader = settingsLoader;
    this.clerk = clerk;
  }

  /**
   * @description executes a method contained in the library. also loads in settings if the execution has them set.
   * @param path the app/method path to execute
   * @param input the input to the method
   * @returns
   */
  async call(path: string, input: unknown): Promise<unknown> {
    const { app, method } = this.clerk.parse(path);
    let settings;
    if (method.settings) {
      settings = await this.settingsLoader(app.id, method.id);
    }

    try {
      return await this.technician.process(method, settings, input);
    } catch (error) {
      if (error instanceof MethodCallFailure) {
        throw new MethodCallFailure({
          message: `method (${path}) failed to execute: ${error.message}`,
          code: error.code,
          cause: error,
          data: { path },
        });
      }
      throw new MethodCallFailure({
        code: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }
}

/** Knows about where applications are stored */
export class Clerk {
  private readonly memory: Heap<ApplicationDefinition>;
  constructor(...applications: ApplicationDefinition[]) {
    this.memory = new Heap();

    for (const application of applications) {
      this.registerApplication(application);
    }
  }

  /**
   * takes a string and turns it into an app/method pair.
   * throws errors if the app or method is not found.
   */
  parse(path: MethodPathKey): ApplicationMethod {
    // split the path into app and method
    const [appId, methodId] = path.split('.');
    return this.borrow({ appId, methodId });
  }

  getApp(appId: string): ApplicationDefinition {
    return this.memory.get(appId);
  }

  /**
   * takes an application method reference and creates a path
   */
  stringify({ app, method }: ApplicationMethod): MethodPathKey {
    return `${app.id}.${method.id}`;
  }

  /**
   * another stringify method, but this one takes an app definition and method definition
   */
  stringifyPathFromDefinitions(
    application: ApplicationDefinition,
    method: MethodDefinition
  ): MethodPathKey {
    return `${application.id}.${method.id}`;
  }

  // register an application, take all the specified paths and assign them.
  registerApplication(app: ApplicationDefinition) {
    this.memory.put(app.id, app);
  }

  /**
   * Get method finds a method using it's path `applicationId.methodId`
   * @param path
   * @returns {MethodDefinition}
   * @throws MethodNotFound
   */
  private borrow(path: { appId: string; methodId: string }): ApplicationMethod {
    const app = this.memory.get(path.appId) as ApplicationDefinition;
    if (!app) {
      throw new MethodCallFailure({
        code: StatusCodes.NOT_FOUND,
        message: `application not found: ${path.appId}`,
        data: { path },
      });
    }

    if (!app.methods) {
      throw new MethodCallFailure({
        code: StatusCodes.NOT_FOUND,
        message: `application has no methods: ${path}`,
        data: { path },
      });
    }

    const method = this.scan(app, path.methodId);

    if (!method) {
      throw new MethodCallFailure({
        code: StatusCodes.NOT_FOUND,
        message: `method not found: ${path}`,
        data: { path },
      });
    }

    return { app, method };
  }

  private scan(
    application: ApplicationDefinition,
    methodId: string
  ): MethodDefinition | undefined {
    return application.methods.find((method) => method.id === methodId);
  }

  list(): ApplicationDefinition[] {
    return this.memory.values();
  }
}

/** Knows about application method execution rules and wraps all processing failures as MethodCallFailures */
export class Technician {
  async process(
    method: MethodDefinition,
    rawSettings: unknown,
    rawInput: unknown
  ): Promise<unknown> {
    let input;
    if (method.input) {
      input = method.input.parse(rawInput);
    }

    let settings: Record<string, unknown> = {};
    if (method.settings) {
      settings = parseSettings(method.settings, rawSettings);
    }

    const result = await method.call({ input, settings });

    let output;
    if (method.output) {
      output = method.output.parse(result);
    }

    return output;
  }
}

export interface SettingsProvider {
  access(method: MethodDefinition): Promise<Record<string, unknown>>;
}

export type SettingSummary = {
  label: string;
  key: string;
  type: SettingType;
  required: boolean;
};
