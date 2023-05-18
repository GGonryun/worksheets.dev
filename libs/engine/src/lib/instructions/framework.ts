/* eslint-disable @typescript-eslint/no-explicit-any */
import { Failure } from '@worksheets/util-errors';

export interface Instruction {
  // type: "assign" | "break";
  process(ctx: Context): void;
}

export class Context {
  public readonly register: Registry;
  public readonly memory: Heap;
  public readonly instructions: Stack<Instruction>;
  constructor(opts?: { input?: unknown }) {
    this.memory = new Heap();
    this.instructions = new Stack<Instruction>();
    this.register = new Registry();
    this.register.input = opts?.input;
  }
}

/**
 * The registry contains named parameters known ahead of time and shared by all instructions.
 */
export class Registry {
  public name: string | undefined;
  public version: number | undefined;
  public failure: Failure | undefined;
  public output: unknown;
  public input: unknown;
}

export class Heap {
  private data: Record<string, any>;
  constructor() {
    this.data = {};
  }

  get(key: string): any {
    return this.data[key];
  }

  put(key: string, value: any): any {
    this.data[key] = value;
  }

  has(key: string): boolean {
    return Boolean(this.data[key]);
  }
}

export class Stack<T> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  push(item: T): boolean {
    this.items.push(item);
    return true;
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  clear(): void {
    this.items = [];
  }

  peekUntil(fn: (i: T) => boolean): boolean {
    for (const item of this.items) {
      if (fn(item)) return true;
    }
    return false;
  }

  peekAll(fn: (i: T) => void) {
    for (const item of this.items) {
      fn(item);
    }
  }
}
