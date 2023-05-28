import {
  ApplicationDefinition,
  MethodCallFailure,
  MethodDefinition,
} from '@worksheets/apps/framework';
import { Heap } from '@worksheets/util/data-structures';
import { StatusCodes } from 'http-status-codes';
import { ZodType } from 'zod';
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
        message: `method ${path} was not found in memory`,
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
      // TODO: add credentials. if the method has credentials.
      // specified. we will search for the user's credentials
      // a locksmith takes in a request, and "unlocks" context.
      // the unlocked context has credentials bound. the method
      // defines the "key" to store the credentials object.
      // for example: if the method defines an enviornment variable
      // of type "oauth", and all of te stuff required to make.
      // an oauth connection. on the webapp, a little lock icon
      // appears, and the user can create a connection. if the
      // envrionment variable with a matching key already exists.
      // then we will load that one in. this allows multiple apps
      // to simply reference the same key. a method can have multiple
      // keys. each lock appears under the application. if the
      // environment variable is "required" then it will be mandatory
      // that the user fills this value in before being able to use.
      // the app. once a connection is set. if the user sets an api
      // key or 'secret' key for the env type, then a little key box
      // entry appears, and a regular token is stored/accessed from the
      // database. when accessing/storing credentials from the locker
      // if they are oauth tokens, we should always refresh and save
      // the latest access token. this means we will need to create
      // a 'get'/'set' command that allows env variables to load only
      // when the library is being called.
      // a "user" library uses a locksmith to lock/unlock applications.
      // this user library grants access to "private" applications
      // otherwise the "public" library allows you to use any apps that
      // do not need credentials.

      // using the path, secret key, uid. we can load that user's creds.
      // when executing public worksheets, we have to be careful because
      // your credentials will get getting loaded in/out of apps.

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
