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

/**
 * Uses JSON.stringify to cleanse an object of any circular references or functions
 * @param obj the object to cleanse
 * @returns the cleansed object
 */
export function cleanseObject<T>(obj: T): unknown {
  if (!obj) return obj;
  // check if object is not an object
  if (typeof obj !== 'object') return obj;
  // check if object is an array
  if (Array.isArray(obj)) return obj.map(cleanseObject);
  // check if object is a function
  if (typeof obj === 'function') return undefined;
  // check if object is a date
  if (obj instanceof Date) return obj;
  // check if object is a regex
  if (obj instanceof RegExp) return obj;
  // check if object is a promise
  if (obj instanceof Promise) return undefined;

  return removeUndefinedProperties(JSON.parse(JSON.stringify(obj)));
}

/**
 * @name removeUndefinedProperties
 * @description removes any properties from an object that are undefined
 * @param {Record<string, unknown>} obj the object to remove undefined properties from
 * @returns {Record<string, unknown>} the object with undefined properties removed
 */
export function removeUndefinedProperties<T extends Record<string, unknown>>(
  obj: T
): T {
  const clonedObj: T = {} as T;

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (value !== undefined) {
        clonedObj[key] = value;
      }
    }
  }

  return clonedObj;
}
