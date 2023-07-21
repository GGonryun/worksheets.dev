import { ScriptEvaluator } from './evaluator';
import { Controller } from './controller';
import { Logger } from './logger';
import { ExecutionFailure } from './failures';
import { SingleMethodInitDefinition } from './instructions';
import { Heap, Stack } from '@worksheets/util/data-structures';
import { Failure, FailureOptions } from '@worksheets/util/errors';
import { StatusCodes } from 'http-status-codes';
import { z } from '@worksheets/zod';

export type LogLevel = z.infer<typeof logLevelEntity>;
export const logLevelEntity = z.enum([
  'trace',
  'debug',
  'info',
  'warn',
  'error',
  'fatal',
  'silent',
]);

export interface Library {
  call(options: {
    path: string;
    input: unknown;
    connection?: string;
  }): Promise<unknown>;
}

export class MethodCallFailure extends Failure {
  public readonly code: StatusCodes;
  constructor(opts: FailureOptions & { code: StatusCodes }) {
    super(opts);
    this.code = opts.code;
  }

  toSimple() {
    return {
      code: this.code,
      message: this.message,
      data: this.data,
    };
  }
}

export type Address = string;

export interface Operation {
  process(ctx: Context): void;
}

export interface Instruction {
  type: string;
  definition: unknown;
  process(ctx: Context): Promise<void>;
}

export type SerializedInstruction = Pick<Instruction, 'type' | 'definition'>;

export function isInstruction(definition: unknown): definition is Instruction {
  if (!definition) return false;
  if (typeof definition != 'object') return false;
  if (Array.isArray(definition)) return false;
  if (!('type' in definition)) return false;
  return true;
}

// memory can have multiple heaps. of which the first is the global heap.
export class Memory {
  // Array of heaps. The first array represents the primary scope. Additional layers of data can be added to any scope. Layers can be removed. If a new method invocation is made, a new scope is required.
  private memory: Heap[][] = [];
  constructor(memory?: Heap[][]) {
    if (memory && memory.length > 0) {
      this.memory = memory;
    } else {
      this.memory.push([new Heap()]);
    }
  }

  clone() {
    const clones = this.memory.map((heaps) =>
      heaps.map((heap) => heap.clone())
    );
    return new Memory(clones);
  }

  scope() {
    return this.memory[this.memory.length - 1];
  }

  scopes() {
    return this.memory;
  }

  createLayer() {
    const scope = this.scope();
    const heap = new Heap();
    scope.push(heap);
  }

  deleteLayer() {
    const scope = this.scope();
    // throw a failure if there is only one heap.
    if (scope.length == 1) {
      throw new ExecutionFailure({
        code: 'invalid-operation',
        message: 'Cannot delete the last scope',
      });
    }

    scope.pop();
  }

  newScope() {
    this.memory.push([new Heap()]);
  }

  dropScope() {
    // throw a failure if there is only one scope.
    if (this.memory.length == 1) {
      throw new ExecutionFailure({
        code: 'invalid-operation',
        message: 'Cannot drop the last scope',
      });
    }
    this.memory.pop();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getData(key: string): any {
    // check the parent heap for the data.
    const heaps = this.scope();
    for (let i = 0; i < heaps.length; i++) {
      const heap = heaps[i];
      if (heap.has(key)) {
        return heap.get(key);
      }
    }
    return undefined;
  }

  putData(key: string, data: unknown) {
    const heaps = this.scope();
    // put the heap in the first heap that has the key.
    for (let i = 0; i < heaps.length; i++) {
      const heap = heaps[i];
      if (heap.has(key)) {
        heap.put(key, data);
        return;
      }
    }
    // otherwise data in last heap.
    const heap = heaps[heaps.length - 1];
    heap.put(key, data);
  }

  hasData(key: string): boolean {
    const heaps = this.scope();
    for (let i = 0; i < heaps.length; i++) {
      const heap = heaps[i];
      if (heap.has(key)) {
        return true;
      }
    }
    return false;
  }
}

/**
 * The Register contains named parameters known ahead of time and shared by all instructions.
 */
export class Register {
  public failure?: MethodCallFailure;
  public output: unknown;
  public input: unknown;
  public duration: number | undefined = 0;
}

export type WorksheetLoader = (address: Address) => SingleMethodInitDefinition;
export class References {
  constructor() {
    // fetches external worksheets if they aren't found when calling "get"
  }
  private references: Record<Address, SingleMethodInitDefinition> = {};
  add(address: Address, definition: SingleMethodInitDefinition) {
    this.references[address] = definition;
  }
  get(address: Address): SingleMethodInitDefinition {
    return this.references[address];
  }
  set(address: Address, definition: SingleMethodInitDefinition) {
    this.references[address] = definition;
  }
  all(): Record<Address, SingleMethodInitDefinition> {
    return this.references;
  }
}

export type StackLimits = {
  max: number;
};

/**
 * The Instructions class is a wrapper around the stack that provides some additional functionality.
 * It is used to ensure that the stack does not exceed a maximum size.
 */
export class Instructions {
  private readonly limits: StackLimits;
  private readonly _stack: Stack<Instruction>;
  constructor(stack: Stack<Instruction>, limits: StackLimits = { max: 100 }) {
    this._stack = stack;
    this.limits = limits;
  }

  stack(): Stack<Instruction> {
    return this._stack.clone();
  }

  clone(): Instructions {
    return new Instructions(this._stack.clone(), this.limits);
  }

  pop(): Instruction | undefined {
    return this._stack.pop();
  }

  data(): Instruction[] {
    return this._stack.data();
  }

  push(instruction: Instruction): void {
    if (this._stack.size() >= this.limits.max) {
      throw new ExecutionFailure({
        code: 'stack-overflow',
        message: `Stack overflow: maximum stack size of ${this.limits.max} exceeded`,
      });
    }

    this._stack.push(instruction);
  }

  peek(): Instruction | undefined {
    return this._stack.peek();
  }

  size(): number {
    return this._stack.size();
  }

  isEmpty(): boolean {
    return this._stack.isEmpty();
  }

  peekUntil(predicate: (instruction: Instruction) => boolean) {
    return this._stack.peekUntil(predicate);
  }
}

/**
 * Information about the current execution.
 */
export class Context {
  public readonly memory: Memory;
  public readonly register: Register;
  public readonly instructions: Instructions;
  public readonly scripts: ScriptEvaluator;
  public readonly library: Library;
  public readonly controller: Controller;
  public readonly references: References;
  public readonly logger: Logger;

  constructor({
    memory,
    register,
    instructions,
    scripts,
    library,
    controller,
    logger,
    references,
  }: Context) {
    this.memory = memory;
    this.register = register;
    this.instructions = instructions;
    this.scripts = scripts;
    this.library = library;
    this.controller = controller;
    this.logger = logger;
    this.references = references;
  }
}
