export function applyFunctionToKeys<T, U>(
  obj: Record<string, T>,
  func: (v: T) => U
): Record<string, U> {
  const clonedObj: Record<string, U> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clonedObj[key] = func(obj[key]);
    }
  }

  return clonedObj;
}
