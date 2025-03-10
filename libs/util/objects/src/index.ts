/* eslint-disable @typescript-eslint/no-explicit-any */
type KeysOfType<T, U> = { [K in keyof T]: T[K] extends U ? K : never }[keyof T];

export const getObjectKeys = <T extends object>(
  obj: T
): KeysOfType<T, any>[] => {
  return Object.keys(obj) as KeysOfType<T, any>[];
};

export const jsonStringifyWithBigInt = (obj: any) => {
  return JSON.stringify(obj, (_, v) =>
    typeof v === 'bigint' ? `${v.toString()}n` : v
  );
};

/**
 * Remove undefined values from an object
 */
export const compress = <T extends Record<string, K>, K>(obj: T) =>
  Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== undefined)
  );
