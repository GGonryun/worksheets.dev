import {
  ApplicationDefinition,
  MethodDefinition,
} from '@worksheets/apps/framework';
import { Heap } from '@worksheets/util-data-structures';

export class Library {
  clerk: Clerk;
  services: TechnicalServices;
  constructor() {
    this.clerk = new Clerk();
    this.services = new TechnicalServices();
  }

  register(app: ApplicationDefinition) {
    this.clerk.register(app);
  }

  catalog(): MethodDefinition[] {
    return this.clerk.display();
  }

  async run(path: string, input: unknown) {
    const method = this.clerk.borrow(path);
    const technician = this.services.assign(method);
    return await technician.process(input);
  }
}

export class TechnicalServices {
  assign(method: MethodDefinition) {
    return new Technician(method);
  }
}

export class Clerk {
  private readonly memory: Heap;
  constructor() {
    this.memory = new Heap();
  }
  // register an application, take all the specified paths and assign them.
  register({ methods }: ApplicationDefinition) {
    for (const method of methods) {
      this.memory.put(method.path, method);
    }
  }

  borrow(path: string): MethodDefinition {
    return this.memory.get(path);
  }

  /** Returns the item's this clerk has access too */
  display(): MethodDefinition[] {
    const values = this.memory.getAll();
    return Object.values(values);
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

    const result = await method.call({ input });

    if (method.output) {
      const output = method.output.parse(result);
      return output;
    }

    return;
  }
}
