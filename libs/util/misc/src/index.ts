export function strict<T>(obj: T, errorMessage: string): NonNullable<T> {
  if (!obj) throw new Error(errorMessage);

  return obj;
}
export const ANONYMOUS_USER_ID = 'anonymous';

// move to a form util
export const labelFor = (id: string) => `${id}-label`;
export const autocompleteFor = (id: string) => `${id}-autocomplete`;
