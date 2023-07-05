import { MethodCallFailure, MethodDefinition } from './methods';

import { Heap } from '@worksheets/util/data-structures';
import { StatusCodes } from 'http-status-codes';
import { TypeOf, z } from 'zod';
import { SettingType, Settings, parseSettings } from './settings';
import {
  FUNCTION_DELIMITER,
  splitFunctionDeclaration,
} from '@worksheets/util/worksheets';

export const applicationMetadata = z.object({
  enabled: z
    .boolean()
    .default(true)
    .describe('if the application is enabled for all users'),
  public: z
    .boolean()
    .default(false)
    .describe('if the application can be used by anyone'),
  gallery: z
    .boolean()
    .default(false)
    .describe('if the app is visible on the gallery'),
  external: z
    .boolean()
    .default(false)
    .describe("if the application should count towards 'external' usage"),
});

export type ApplicationMetadata = TypeOf<typeof applicationMetadata>;
export type ApplicationDefinition = {
  id: string;
  logo: string; // url to app logo
  label: string;
  meta: ApplicationMetadata;
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
  beforeMethodCall: BeforeMethodCallHook;
};

export type SettingsLoader = (options: {
  app: ApplicationDefinition;
  method: MethodDefinition;
  path: string;
  input: unknown;
}) => Promise<Record<string, unknown>>;

export type BeforeMethodCallHook = (opts: {
  path: string;
  app: ApplicationDefinition;
  method: MethodDefinition;
  input: unknown;
  settings: Record<string, unknown> | undefined;
}) => Promise<void>;

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
  private readonly settingsLoader: SettingsLoader;
  private readonly beforeMethodCall: BeforeMethodCallHook;
  private readonly clerk: Clerk;
  private readonly technician: Technician;
  constructor({
    clerk,
    settingsLoader,
    beforeMethodCall,
  }: ApplicationLibraryOptions) {
    this.technician = new Technician();

    this.settingsLoader = settingsLoader;
    this.beforeMethodCall = beforeMethodCall;
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
      console.info(`[APPLAUNCHER][${path}] loading settings`);
      settings = await this.settingsLoader({ app, method, path, input });
      console.info(
        `[APPLAUNCHER][${path}] found settings`,
        Object.keys(settings)
      );
    }

    await this.beforeMethodCall({
      app,
      method,
      path,
      input,
      settings,
    });

    try {
      const data = await this.technician.process(method, settings, input);
      return data;
    } catch (error) {
      console.error('error', error);
      if (error instanceof MethodCallFailure) {
        throw new MethodCallFailure({
          message: `method (${path}) failed to execute: ${error.message}`,
          code: error.code,
          cause: error,
          data: { path },
        });
      }

      throw error;
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
    if (path.indexOf(FUNCTION_DELIMITER) === -1) {
      // alternative path for invoking a core app.
      return this.borrow({ appId: 'core', methodId: path });
    } else {
      // split the path into app and method
      const { app, method } = splitFunctionDeclaration(path);
      return this.borrow({ appId: app, methodId: method });
    }
  }

  getApp(appId: string): ApplicationDefinition {
    return this.memory.get(appId);
  }

  /**
   * takes an application method reference and creates a path
   */
  stringify({ app, method }: ApplicationMethod): MethodPathKey {
    return `${app.id}${FUNCTION_DELIMITER}${method.id}`;
  }

  stringifyBasic(appId: string, methodId: string): MethodPathKey {
    return `${appId}${FUNCTION_DELIMITER}${methodId}`;
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
        message: `method not found: ${JSON.stringify(path)}`,
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
    const logHeader = `[TECHNICIAN][${method.id}]`;
    console.debug(`${logHeader} received method processing request`);

    let input;
    if (method.input) {
      input = method.input.parse(rawInput);
    }

    let settings: Record<string, unknown> = {};
    if (method.settings) {
      console.debug(`${logHeader} parsing settings`);
      settings = parseSettings(method.settings, rawSettings);
    }

    const result = await method.call({ input, settings });

    let output;
    if (method.output) {
      output = method.output.parse(result);
    }

    console.debug(`${logHeader} completed method processing`);
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
