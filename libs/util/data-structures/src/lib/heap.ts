/* eslint-disable @typescript-eslint/no-explicit-any */
import { cloneDeep } from 'lodash';

const SIZE_MODIFIER = 10000;

export class Heap<T = any> {
  private data: Record<string, T>;

  constructor(data?: Record<string, T>) {
    this.data = data ?? {};
  }

  getAll(): Record<string, T> {
    return cloneDeep(this.data);
  }

  values(): T[] {
    return Object.values(this.getAll());
  }

  get(key: string): T {
    return cloneDeep(this.data[key]);
  }

  put(key: string, value: any) {
    this.data[key] = value ?? null;
  }

  delete(key: string) {
    if (this.has(key)) {
      delete this.data[key];
    }
  }

  has(key: string): boolean {
    return this.data[key] !== undefined;
  }

  keys(): string[] {
    return Object.keys(this.data);
  }

  clone(): Heap<T> {
    return new Heap(cloneDeep(this.data));
  }

  restore({ data }: Heap<T>) {
    const newData = cloneDeep(data);
    this.data = newData;
  }

  // guesst-imate of the heap size by calculating the size of the stringified heap
  size(): number {
    const guestimate = new TextEncoder().encode(this.serialize()).length;
    return guestimate / SIZE_MODIFIER;
  }

  private serialize() {
    return JSON.stringify(this.data);
  }
}
