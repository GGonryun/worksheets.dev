import { Heap } from '../structures';
import { Context } from './context';

describe('Heap', () => {
  describe('constructor', () => {
    it('builds from another heap', () => {
      const opts = { key: 'test', value: 'sample' };
      const memory = new Heap();
      memory.put(opts.key, opts.value);
      expect(memory.get(opts.key)).toEqual(opts.value);
    });
    it('does nothing if you pass in another heap', () => {
      const opts = { key: 'test', value: 'sample' };
      const memory = new Heap();
      memory.put(opts.key, opts.value);
      const brain = new Heap(memory);
      expect(brain.get(opts.key)).toEqual(undefined);
    });
    it('builds context from another heap', () => {
      const opts = { key: 'test', value: 'sample' };
      const memory = new Heap();
      memory.put(opts.key, opts.value);
      expect(memory.get(opts.key)).toEqual(opts.value);

      const ctx = new Context({ memory });
      expect(ctx.memory.get(opts.key)).toEqual(opts.value);
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
