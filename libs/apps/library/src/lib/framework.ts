import {
  ApplicationDefinition,
  MethodCallFailure,
  MethodDefinition,
} from '@worksheets/apps/framework';
import { Heap } from '@worksheets/util-data-structures';
import { StatusCodes } from 'http-status-codes';
import { ZodType, string } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';
import { JsonSchema7Type } from 'zod-to-json-schema/src/parseDef';

/** Knows about where applications are stored and how */
export class Clerk {
  private readonly memory: Heap;
  constructor(...applications: ApplicationDefinition[]) {
    this.memory = new Heap();
    for (const application of applications) {
      this.register(application);
    }
  }
  // register an application, take all the specified paths and assign them.
  register({ methods }: ApplicationDefinition) {
    for (const method of methods) {
      if (this.memory.get(method.path)) {
        throw new Error(`method ${method.path} already exists in the library`);
      }
      this.memory.put(method.path, method);
    }
  }

  borrow(path: string): MethodDefinition {
    const method = this.memory.get(path);
    if (!method) {
      throw new MethodCallFailure({
        code: StatusCodes.NOT_FOUND,
        message: `method ${method.path} was not found in memory`,
      });
    }
    return method;
  }

  /** Returns the item's this clerk has access too */
  display(): MethodDefinition[] {
    const values = this.memory.getAll();
    return Object.values(values);
  }
}

/** Knows about application method execution rules and wraps all processing failures as MethodCallFailures */
export class Technician {
  async process(method: MethodDefinition, raw: unknown): Promise<unknown> {
    let input;
    if (method.input) {
      const parse = method.input.safeParse(raw);
      if (!parse.success) {
        const msg = parse.error.errors.at(0)?.message ?? 'unexpected';
        throw new MethodCallFailure({
          code: StatusCodes.UNPROCESSABLE_ENTITY,
          message: `method ${
            method.path
          } received invalid input -- ${msg.toLocaleLowerCase()}`,
        });
      }
      input = parse.data;
    }

    let result;
    try {
      result = await method.call({ input });
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
      const parse = method.output.safeParse(result);
      if (!parse.success) {
        throw new MethodCallFailure({
          code: StatusCodes.UNPROCESSABLE_ENTITY,
          message: `method ${method.path} created unexpected output`,
        });
      }
      output = parse.data;
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
  }: MethodDefinition): MethodSummary {
    console.log('path', label);
    return {
      path,
      label,
      description: description ?? '',
      input: this.printSchema(input),
      output: this.printSchema(output),
    };
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

export type MethodSummary = {
  path: string;
  label: string;
  description: string;
  input: JsonSchema7Type;
  output: JsonSchema7Type;
};

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// type FieldDescription<K extends keyof any = string, T = string> = {
//   [P in K]: T | FieldDescription<K, T>;
// };
