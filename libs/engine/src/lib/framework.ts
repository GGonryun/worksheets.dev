import { Heap, Stack } from '@worksheets/util/data-structures';
import { ScriptEvaluator } from './evaluator';
import { Library, MethodCallFailure } from '@worksheets/apps/framework';
import { Controller } from './controller';
import { Logger } from './logger';

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

export class Memory {
  private heaps: Heap[] = [];
  constructor(heaps?: Heap[]) {
    if (heaps && heaps.length > 0) {
      this.heaps = heaps;
    } else {
      const heap = new Heap();
      this.heaps.push(heap);
    }
  }

  clone() {
    const clones = this.heaps.map((heap) => heap.clone());
    return new Memory(clones);
  }

  createScope() {
    const heap = new Heap();
    this.heaps.push(heap);
    return heap;
  }

  deleteScope() {
    this.heaps.pop();
  }

  getHeaps() {
    return this.heaps;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getData(key: string): any {
    // check the parent heap for the data.
    for (let i = 0; i < this.heaps.length; i++) {
      const heap = this.heaps[i];
      if (heap.has(key)) {
        return heap.get(key);
      }
    }
    return undefined;
  }

  putData(key: string, data: unknown) {
    // put the heap in the first heap that has the key.
    for (let i = 0; i < this.heaps.length; i++) {
      const heap = this.heaps[i];
      if (heap.has(key)) {
        heap.put(key, data);
        return;
      }
    }
    // otherwise data in last heap.
    const heap = this.heaps[this.heaps.length - 1];
    heap.put(key, data);
  }

  hasData(key: string): boolean {
    for (let i = 0; i < this.heaps.length; i++) {
      const heap = this.heaps[i];
      if (heap.has(key)) {
        return true;
      }
    }
    return false;
  }

  /**
   * @name setHeap
   * @warning do not use this method unless you know what you are doing, allows you to replace the any heap at any index with a new one.
   * @todo we should refactor tests that relay on this method to use the arrange/assert paradigm
   */
  setHeap(index: number, heap: Heap) {
    this.heaps[index] = heap;
  }
}

/**
 * The Register contains named parameters known ahead of time and shared by all instructions.
 */
export class Register {
  public failure?: MethodCallFailure;
  public output: unknown;
  public input: unknown;
}

/**
 * Information about the current execution.
 */
export class Context {
  public readonly memory: Memory;
  public readonly register: Register;
  public readonly instructions: Stack<Instruction>;
  public readonly scripts: ScriptEvaluator;
  public readonly library: Library;
  public readonly controller: Controller;
  public readonly logger: Logger;

  constructor({
    memory,
    register,
    instructions,
    scripts,
    library,
    controller,
    logger,
  }: Context) {
    this.memory = memory;
    this.register = register;
    this.instructions = instructions;
    this.scripts = scripts;
    this.library = library;
    this.controller = controller;
    this.logger = logger;
  }
}
