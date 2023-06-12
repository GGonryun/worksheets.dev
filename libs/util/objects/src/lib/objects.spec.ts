import { applyFunctionToKeys, removeUndefinedProperties } from './objects';
describe('applyFunctionToKeys', () => {
  test('Calling a function on each key and returning a new object', () => {
    const obj: Record<string, number> = { a: 1, b: 2, c: 3 };

    function pushKey(v: number): string {
      return `${v}`;
    }

    const clonedObj = applyFunctionToKeys(obj, pushKey);

    expect(clonedObj).toEqual({ a: '1', b: '2', c: '3' });
    expect(clonedObj).not.toBe(obj);
  });

  test('Modifying each key with a function and returning a new object', () => {
    const obj: Record<string, number> = { foo: 1, bar: 2, baz: 3 };

    function addPrefix(number: number): string {
      return 'prefix_' + number;
    }

    const clonedObj = applyFunctionToKeys(obj, addPrefix);

    expect(clonedObj).toEqual({
      foo: 'prefix_1',
      bar: 'prefix_2',
      baz: 'prefix_3',
    });
    expect(obj).toEqual({ foo: 1, bar: 2, baz: 3 });
    expect(clonedObj).not.toBe(obj);
  });

  test('Calling a function on an empty object and returning an empty object', () => {
    const obj = {};
    let counter = 0;

    function incrementCounter(): void {
      counter++;
    }

    const clonedObj = applyFunctionToKeys(obj, incrementCounter);

    expect(clonedObj).toEqual({});
    expect(counter).toBe(0);
    expect(clonedObj).not.toBe(obj);
  });
});

describe('removeUndefinedProperties', () => {
  it('should remove undefined properties from an object', () => {
    const obj = {
      a: 1,
      b: undefined,
      c: 3,
      d: undefined,
    };
    expect(removeUndefinedProperties(obj)).toEqual({
      a: 1,
      c: 3,
    });
  });
  it('should handle empty objects', () => {
    const obj = {};
    expect(removeUndefinedProperties(obj)).toEqual({});
  });
});
