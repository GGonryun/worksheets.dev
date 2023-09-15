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

export function randomizeArray<T>(arr: T[]): T[] {
  return arr.sort(() => Math.random() - 0.5);
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
