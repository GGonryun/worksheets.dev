export function strict<T>(obj: T, errorMessage: string): NonNullable<T> {
  if (!obj) throw new Error(errorMessage);

  return obj;
}
