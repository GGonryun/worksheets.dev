/* eslint-disable @typescript-eslint/no-explicit-any */
import { cloneDeep } from 'lodash';

const SIZE_MODIFIER = 10000;

export class Heap {
  private data: Record<string, any>;

  constructor(data?: Record<string, any>) {
    this.data = data ?? {};
  }

  getAll(): any {
    return cloneDeep(this.data);
  }

  get(key: string): any {
    return cloneDeep(this.data[key]);
  }

  put(key: string, value: any) {
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

  // guesst-imate of the heap size by calculating the size of the stringified heap
  size(): number {
    const guestimate = new TextEncoder().encode(this.serialize()).length;
    return guestimate / SIZE_MODIFIER;
  }

  private serialize() {
    return JSON.stringify(this.data);
  }
}
