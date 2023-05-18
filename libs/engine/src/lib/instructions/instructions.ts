/* eslint-disable @typescript-eslint/no-explicit-any */
import { Failure } from '@worksheets/util-errors';

export interface Instruction {
  process(ctx: Context): void;
}

export class Context {
  public readonly info: Information;
  public readonly heap: Heap;
  public readonly stack: Stack<Instruction>;
  constructor(opts?: { input?: unknown }) {
    this.heap = new Heap();
    this.stack = new Stack<Instruction>();
    this.info = new Information();
    this.info.input = opts?.input;
  }
}

export class Information {
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
}
