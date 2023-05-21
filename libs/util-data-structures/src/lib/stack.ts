import { cloneDeep } from 'lodash';

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
