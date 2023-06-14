import { Heap } from '@worksheets/util/data-structures';
import { Memory } from './framework';

describe('Heap', () => {
  describe('constructor', () => {
    it('loading from another heap does nothing to original heap.', () => {
      const opts = { key: 'test', value: 'sample' };
      const memory = new Heap();
      memory.put(opts.key, opts.value);
      const brain = new Heap(memory);
      expect(brain.get(opts.key)).toEqual(undefined);
    });
  });
  describe('put', () => {
    it('allows input ', () => {
      const opts = { key: 'test', value: 'sample' };
      const memory = new Heap();
      memory.put(opts.key, opts.value);
      expect(memory.get(opts.key)).toEqual(opts.value);
    });
  });
  describe('has', () => {
    function expectClear(heap: Heap, key: string) {
      heap.delete(key);
      expect(heap.has(key)).toBeFalsy();
    }
    function expectPut(heap: Heap, key: string, value: unknown) {
      heap.put(key, value);
      expect(heap.has(key)).toBeTruthy();
    }

    it.each([false, -0, 0, '', NaN])(
      'handles falsy value "%s" but not as null',
      (input) => {
        const key = 'test';
        const heap = new Heap();
        expect(heap.has(key)).toBeFalsy();
        expectPut(heap, key, input);
        expectClear(heap, key);
      }
    );
  });
});

describe('Memory', () => {
  it('gets data from the first heap', () => {
    const key = 'test';
    const value = 'sample';
    const memory = new Memory();
    memory.putData(key, value);
    expect(memory.getData(key)).toEqual(value);
  });

  it('places data in lowest scope with key', () => {
    const key = 'test';
    const value = 'sample';
    const memory = new Memory();
    memory.putData(key, value);
    memory.createScope();
    const heaps = memory.getHeaps();
    // second heap should be empty.
    expect(heaps[1].get(key)).toEqual(undefined);
  });

  it('places data in next scope if key does not exist', () => {
    const key = 'test';
    const value = 'sample';
    const memory = new Memory();
    memory.createScope();
    memory.putData(key, value);
    const heaps = memory.getHeaps();
    // first heap should be empty.
    expect(heaps[0].get(key)).toEqual(undefined);
    // second heap has key.
    expect(heaps[1].get(key)).toEqual(value);
  });

  it('gets data from the first heap that has the key', () => {
    const key = 'test';
    const value = 'sample';
    const memory = new Memory();
    memory.putData(key, value);
    memory.createScope();
    expect(memory.getData(key)).toEqual(value);
  });
});
