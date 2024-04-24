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

export const lottery = <T extends string | number>(
  entries: Record<T, number>
): T => {
  const total = Object.entries(entries).flatMap(
    ([key, value]) => Array(value).fill(key) as T[]
  );
  return randomArrayElement<T>(total);
};
