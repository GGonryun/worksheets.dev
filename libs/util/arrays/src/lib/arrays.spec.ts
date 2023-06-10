import { reverseArray } from './arrays';

describe('reverseArray', () => {
  it('should iterate over an array of numbers in reverse order', () => {
    const arr = [1, 2, 3, 4, 5];
    const expectedOutput = [5, 4, 3, 2, 1];
    const reversedArray = reverseArray(arr);
    expect(reversedArray).toEqual(expectedOutput);
  });

  it('should iterate over an array of strings in reverse order', () => {
    const arr = ['a', 'b', 'c', 'd', 'e'];
    const expectedOutput = ['e', 'd', 'c', 'b', 'a'];
    const reversedArray = reverseArray(arr);
    expect(reversedArray).toEqual(expectedOutput);
  });

  it('should return an empty array when given an empty array', () => {
    const arr: number[] = [];
    const expectedOutput: number[] = [];
    const reversedArray = reverseArray(arr);
    expect(reversedArray).toEqual(expectedOutput);
  });

  it('should handle an array with a single element', () => {
    const arr = [10];
    const expectedOutput = [10];
    const reversedArray = reverseArray(arr);
    expect(reversedArray).toEqual(expectedOutput);
  });

  it('should handle an array with duplicate elements', () => {
    const arr = [2, 4, 6, 8, 10, 10, 8, 6, 4, 2];
    const expectedOutput = [2, 4, 6, 8, 10, 10, 8, 6, 4, 2];
    const reversedArray = reverseArray(arr);
    expect(reversedArray).toEqual(expectedOutput);
  });

  it('should return an empty array when given an undefined array', () => {
    const arr = undefined;
    const expectedOutput: unknown[] = [];
    const reversedArray = reverseArray(arr);
    expect(reversedArray).toEqual(expectedOutput);
  });

  it('should reverse a list of functions and execute them in reverse order', () => {
    const func1 = (input: string): string => {
      return input.toUpperCase();
    };

    const func2 = (input: string): string => {
      return input.toLowerCase();
    };

    const func3 = (input: string): string => {
      return input + '!!!';
    };

    const functionList = [func1, func2, func3];
    const reversedFunctionList = reverseArray(functionList);

    const input = 'Hello';

    let result = input;
    for (const func of reversedFunctionList) {
      result = func(result);
    }

    expect(result).toBe('HELLO!!!');
  });
});

it('should reverse a list of functions returning objects and accumulate their properties', () => {
  const func1 = (): object => {
    return { prop1: 'Hello' };
  };

  const func2 = (): object => {
    return { prop2: 'World' };
  };

  const func3 = (): object => {
    return { prop3: '!' };
  };

  const functionList = [func1, func2, func3];
  const reversedFunctionList = reverseArray(functionList);

  let result = {};
  for (const func of reversedFunctionList) {
    result = { ...result, ...func() };
  }

  const expectedOutput = {
    prop3: '!',
    prop2: 'World',
    prop1: 'Hello',
  };

  expect(result).toEqual(expectedOutput);
});
