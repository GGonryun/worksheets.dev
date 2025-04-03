import { has, isObject } from 'lodash';

export function strict<T>(obj: T, errorMessage: string): NonNullable<T> {
  if (!obj) throw new Error(errorMessage);

  return obj;
}
export const ANONYMOUS_USER_ID = 'anonymous';

// move to a form util
export const labelFor = (id: string) => `${id}-label`;
export const autocompleteFor = (id: string) => `${id}-autocomplete`;

export const hasKey = (
  obj: unknown,
  key: string
): obj is Record<string, unknown> => {
  return isObject(obj) && has(obj, key);
};

export const parseKey = <T>(
  obj: unknown,
  key: string,
  type: 'string' | 'number' | 'boolean'
): T => {
  if (!hasKey(obj, key)) {
    throw new Error(`Input is missing ${key} field`);
  }

  if (typeof obj[key] !== type) {
    throw new Error(`${key} must be a ${type}`);
  }

  return obj[key] as T;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const noop = (..._: unknown[]) => {
  // noop
};
