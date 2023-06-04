import { MethodCallFailure, MethodDefinition } from './methods';

import { Graph, Heap } from '@worksheets/util/data-structures';
import { StatusCodes } from 'http-status-codes';
import { ZodType } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';
import { JsonSchema7Type } from 'zod-to-json-schema/src/parseDef';
import { SettingType, Settings, safeParse } from './settings';

export type ApplicationDefinition = {
  label: string;
  description: string;
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
  methodPath: string
) => Promise<Record<string, unknown>>;

export class ApplicationLibrary {
  private readonly clerk: Clerk;
  private readonly settingsLoader: SettingsLoader;
  private readonly technician: Technician;
  constructor({ clerk, settingsLoader }: ApplicationLibraryOptions) {
    this.technician = new Technician();

    this.settingsLoader = settingsLoader;
    this.clerk = clerk;
  }

  async call(path: string, input: unknown): Promise<unknown> {
    const method = this.clerk.borrow(path);
    let settings;
    if (method.settings) {
      settings = await this.settingsLoader(method.path);
    }
    return await this.technician.process(method, settings, input);
  }
}

/** Knows about where applications are stored and how */
export class Clerk {
  private readonly translator: Translator;
  private readonly memory: Heap;
  constructor(...applications: ApplicationDefinition[]) {
    this.memory = new Heap();
    this.translator = new Translator();

    for (const application of applications) {
      this.registerApplication(application);
    }
  }
  // register an application, take all the specified paths and assign them.
  registerApplication({ methods }: ApplicationDefinition) {
    for (const method of methods) {
      this.registerMethod(method);
    }
  }

  registerMethod(method: MethodDefinition) {
    if (this.memory.get(method.path)) {
      throw new Error(`method ${method.path} already exists in the library`);
    }
    this.memory.put(method.path, method);
  }

  borrow(path: string): MethodDefinition {
    const method = this.memory.get(path);
    if (!method) {
      throw new MethodCallFailure({
        code: StatusCodes.NOT_FOUND,
        message: `method ${path} was not found in memory`,
      });
    }
    return method;
  }

  /** Returns the item's this clerk has access too */
  list(): MethodDefinition[] {
    const values = this.memory.getAll();
    return Object.values(values);
  }

  tree(): Graph<MethodSummary> {
    const methods = this.list();
    const graph = new Graph<MethodSummary>();
    for (const method of methods) {
      graph.addNode(method.path, this.translator.print(method));
    }
    return graph;
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
      const parsed = method.input.safeParse(rawInput);
      if (!parsed.success) {
        const err = parsed.error.errors.at(0);
        throw new MethodCallFailure({
          code: StatusCodes.UNPROCESSABLE_ENTITY,
          message: `method ${
            method.path
          } received invalid input for parameter '${err?.path.toString()}' ${err?.message.toString()}`,
          data: err,
        });
      }
      input = parsed.data;
    }

    let settings: Record<string, unknown> = {};
    if (method.settings) {
      const parsed = safeParse(method.settings, rawSettings);
      if (!parsed.success) {
        const msg = parsed.errors.at(0)?.message ?? 'unexpected';
        throw new MethodCallFailure({
          code: StatusCodes.UNPROCESSABLE_ENTITY,
          message: `method ${
            method.path
          } contains invalid settings -- ${msg.toLocaleLowerCase()}`,
          data: parsed.errors,
        });
      }
      settings = parsed.data;
    }

    let result;
    try {
      result = await method.call({ input, settings });
    } catch (error) {
      if (error instanceof MethodCallFailure) {
        throw error;
      }
      throw new MethodCallFailure({
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        message: `method: ${method.path} failed unexpectedly`,
        cause: error,
      });
    }

    let output;
    if (method.output) {
      const parsed = method.output.safeParse(result);
      if (!parsed.success) {
        throw new MethodCallFailure({
          code: StatusCodes.UNPROCESSABLE_ENTITY,
          message: `method ${method.path} created unexpected output`,
          data: parsed.error,
        });
      }
      output = parsed.data;
    }

    return output;
  }
}

export class Translator {
  print({
    path,
    input,
    output,
    label,
    description,
    settings,
  }: MethodDefinition): MethodSummary {
    return {
      path,
      label,
      description: description ?? '',
      settings: this.printSettings(settings),
      input: this.printSchema(input),
      output: this.printSchema(output),
    };
  }

  private printSettings(settings: Settings | null = {}): SettingSummary[] {
    const summary: SettingSummary[] = [];
    for (const key in settings) {
      const { label, type, required } = settings[key];
      summary.push({
        label: label ?? key,
        key,
        type,
        required,
      });
    }
    return summary;
  }

  private printSchema(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type: ZodType<any, any, any> | undefined | null
  ): JsonSchema7Type {
    if (!type) {
      return {};
    }

    const schema = zodToJsonSchema(type, 'schema');
    if (!schema.definitions) {
      return {};
    }

    return schema.definitions['schema'];
  }
}

export interface SettingsProvider {
  access(method: MethodDefinition): Promise<Record<string, unknown>>;
}

export type MethodSummary = {
  path: string;
  label: string;
  description: string;
  settings: SettingSummary[];
  input: JsonSchema7Type;
  output: JsonSchema7Type;
};

export type SettingSummary = {
  label: string;
  key: string;
  type: SettingType;
  required: boolean;
};
