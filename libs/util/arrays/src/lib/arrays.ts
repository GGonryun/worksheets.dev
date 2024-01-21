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
