import { PositiveNumber } from '@worksheets/phaser/numbers';
import * as Phaser from 'phaser';

export type BoundedObject = {
  getBounds(output?: Phaser.Geom.Rectangle): Phaser.Geom.Rectangle;
};

export type Poolable = {
  onAcquire?(): void;
  onRelease?(): void;
  onDestroy?(): void;
};

export abstract class ObjectFactory<T extends Poolable> {
  constructor(public create: () => T) {}
}

export class ObjectPoolOptions {
  initialSize: PositiveNumber;
  maxSize: PositiveNumber;

  constructor(options?: Partial<ObjectPoolOptions>) {
    this.initialSize = options?.initialSize ?? PositiveNumber.of(0);
    this.maxSize = options?.maxSize ?? PositiveNumber.of(100);
  }
}

/**
 * A simple object pool implementation. It will dynamically grow the pool if needed.
 *
 * If the pool exceeds the maximum size, the least recently used item will be destroyed.
 *
 * The pool defaults to a maximum size of 100.
 */
export class ObjectPool<T extends Poolable> {
  items: T[];
  options: Required<ObjectPoolOptions>;
  factory: ObjectFactory<T>;
  constructor(
    factory: ObjectFactory<T>,
    options: ObjectPoolOptions = new ObjectPoolOptions()
  ) {
    this.options = options;
    this.factory = factory;
    this.items = [];

    this.#initialize();
  }

  #initialize() {
    for (let i = 0; i < this.options.initialSize.value; i++) {
      this.items.push(this.factory.create());
    }
  }

  acquire(): T {
    const item = this.items.pop() || this.factory.create();
    item.onAcquire?.();
    return item;
  }

  release(item: T) {
    item.onRelease?.();
    const length = this.items.push(item);
    if (length > this.options.maxSize.value) {
      const excess = length - this.options.maxSize.value;
      for (let i = 0; i < excess; i++) {
        const item = this.items.shift();
        item?.onDestroy?.();
      }
    }
  }
}
