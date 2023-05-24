import {
  ApplicationDefinition,
  MethodCallFailure,
  MethodDefinition,
} from '@worksheets/apps/framework';
import { Heap } from '@worksheets/util-data-structures';
import { StatusCodes } from 'http-status-codes';

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
        throw new MethodCallFailure({
          code: StatusCodes.UNPROCESSABLE_ENTITY,
          message: `method ${method.path} received invalid input`,
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
