// reverses and clones the contents of the array
export function reverseArray<T>(arr?: T[]): T[] {
  if (!arr) return [];
  const reversedArray: T[] = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    const item = arr[i];
    reversedArray.push(item);
  }
  return reversedArray;
}

export function uniqueArray<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

export const shuffleArray = randomizeArray;

export function randomizeArray<T>(arr: T[]): T[] {
  return arr.sort(() => Math.random() - 0.5);
}

export function selectRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const arrayFromLength = (length: number): number[] => {
  return Array.from({ length }, (_, i) => i);
};

export function chunkArray<T>(arr: T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    chunks.push(chunk);
  }
  return chunks;
}

export function splitArray<T>(arr: T[], splits: number): T[][] {
  if (splits < 1) throw new Error('splits must be greater than 0');
  if (splits === 1) return [arr];

  const chunkSize = Math.ceil(arr.length / splits);
  return chunkArray(arr, chunkSize);
}

export function trimDivisibly<T>(arr: T[], divisor: number): T[] {
  const remainder = arr.length % divisor;
  if (remainder === 0) return arr;
  return arr.slice(0, arr.length - remainder);
}

export function splitArrayEqually<T>(arr: T[], splits: number): T[][] {
  const trimmedArray = trimDivisibly(arr, splits);
  return splitArray(trimmedArray, splits);
}

export const replaceItem = <T>(arr: T[], index: number, value: T) => {
  const copy = [...arr];
  copy[index] = value;
  return copy;
};

/**
 * From an array, convert them into a keys for a map, the values should be set to true/false.
 */
export const createMap = <T extends string | number, V>(
  keys: T[],
  defaultValue: V
) => {
  return keys.reduce((acc, key) => {
    acc[key] = defaultValue;
    return acc;
  }, {} as Record<T, V>);
};

// Creates a list of all possible permutations of the given 2d array.
export const combine = ([
  head,
  ...[headTail, ...tailTail]
]: string[][]): string[] => {
  if (!headTail) return head;

  const combined = headTail.reduce((acc, x) => {
    return acc.concat(head.map((h) => `${h}${x}`));
  }, [] as string[]);

  return combine([combined, ...tailTail]);
};

export const compareArrays = <T>(arr1: T[], arr2: T[]): boolean => {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((item, index) => item === arr2[index]);
};
