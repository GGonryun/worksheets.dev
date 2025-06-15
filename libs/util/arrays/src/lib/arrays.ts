export function uniqueArray<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

export function checkboxGroup<T>(array: T[], value: T, checked: boolean): T[] {
  if (checked) {
    return uniqueArray([...array, value]);
  } else {
    return array.filter((v) => v !== value);
  }
}

// array from number.

export function arrayFromNumber(num: number): number[] {
  return Array.from(Array(num).keys());
}

export function fill<T>(items: number, content: T): T[] {
  return Array.from({ length: items }).fill(content) as T[];
}

export const batchArray = <T>(arr: T[], batchSize: number): T[][] => {
  const numBatches = Math.ceil(arr.length / batchSize);
  const batches: T[][] = [];
  for (let i = 0; i < numBatches; i++) {
    batches.push(arr.slice(i * batchSize, (i + 1) * batchSize));
  }
  return batches;
};
/**
 * This implementation uses the Fisher-Yates shuffle algorithm, which is a proven method
 * for shuffling arrays randomly and uniformly. After shuffling the array, you can then
 * select the first entry as the winner, which is as random as it can get.
 */
export function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j: number = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const randomArrayElement = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const pickRandom = <T>(arr: T[], count = 1): T[] => {
  if (count >= arr.length) {
    return shuffle(arr);
  }
  const shuffled = shuffle(arr);
  return shuffled.slice(0, count);
};

export const lottery = <T extends string | number>(
  entries: Record<T, number>
): T => {
  const total = Object.entries(entries).flatMap(
    ([key, value]) => Array(value).fill(key) as T[]
  );
  return randomArrayElement<T>(total);
};

export const frequency = <T extends string | number>(
  arr: T[]
): Record<T, number> => {
  return arr.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {} as Record<T, number>);
};

export const weightedPick = <T>(arr: T[], weights: number[]): T => {
  const totalWeight = weights.reduce((acc, curr) => acc + curr, 0);
  const random = Math.random() * totalWeight;
  let weightSum = 0;
  for (let i = 0; i < arr.length; i++) {
    weightSum += weights[i];
    if (random < weightSum) {
      return arr[i];
    }
  }
  return arr[arr.length - 1];
};

export const hasOne = <T>(array: T[]): array is [T] => array.length === 1;
export const hasNone = <T>(array: T[]): array is [] => array.length === 0;
export const hasMany = <T>(array: T[]): array is T[] => array.length > 1;
// Generate a tuple type of length N
type TupleOf<T, N extends number, R extends T[] = []> = R['length'] extends N
  ? R
  : TupleOf<T, N, [T, ...R]>;

// Main utility function
export const hasExactly = <T, N extends number>(
  array: T[],
  count: N
): array is TupleOf<T, N> => array.length === count;

export const toArrayAsync = async <T>(generator: AsyncGenerator<T>) => {
  const result: T[] = [];
  for await (const item of generator) {
    result.push(item);
  }
  return result;
};

export const toArray = <T>(generator: Generator<T>) => {
  const result: T[] = [];
  for (const item of generator) {
    result.push(item);
  }
  return result;
};
