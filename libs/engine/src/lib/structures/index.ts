/* eslint-disable @typescript-eslint/no-explicit-any */
import { cloneDeep } from 'lodash';

export class Heap {
  private data: Record<string, any>;
  constructor(data?: Record<string, any>) {
    this.data = data ?? {};
  }

  get(key: string): any {
    return this.data[key];
  }

  put(key: string, value: any): any {
    this.data[key] = value;
  }

  putMulti(map: Record<string, any>) {
    for (const key in map) {
      this.data[key] = map[key];
    }
  }

  delete(key: string) {
    if (this.has(key)) {
      delete this.data[key];
    }
  }

  has(key: string): boolean {
    return this.data[key] != null;
  }

  keys(): string[] {
    return Object.keys(this.data);
  }

  clone(): Heap {
    return new Heap(cloneDeep(this.data));
  }

  restore({ data }: Heap) {
    const newData = cloneDeep(data);
    this.data = newData;
  }

  lock(): WriteOnlyHeap {
    return new WriteOnlyHeap(this);
  }
}

// accepts arrays or objects and turns them into Record<PropertyKey, value>
export class ArrayObjectHeap {}

export class WriteOnlyHeap
  implements Omit<Heap, 'delete' | 'put' | 'putMulti' | 'restore' | 'lock'>
{
  heap: Heap;
  constructor(heap: Heap) {
    this.heap = heap;
  }

  has(key: string): boolean {
    return this.heap.has(key);
  }

  keys(): string[] {
    return this.heap.keys();
  }

  clone(): Heap {
    return this.heap.clone();
  }

  get(key: string): any {
    return this.heap.get(key);
  }

  unlock(): Heap {
    return this.heap;
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

  popAll(): T[] {
    const items = cloneDeep(this.items);
    this.clear();
    return items;
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

  peekAll(fn: (item: T, index: number) => void) {
    let i = 0;
    for (const item of this.items) {
      fn(item, ++i);
    }
  }
}
