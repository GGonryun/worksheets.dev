import { Heap } from '@worksheets/util-data-structures';

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
