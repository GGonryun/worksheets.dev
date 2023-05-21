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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(key: string): any {
    return this.heap.get(key);
  }

  unlock(): Heap {
    return this.heap;
  }
}
