export type Keys<T> = keyof T;
export type Maybe<T> = T | undefined;
/**
 * A partial type that only makes the keys specified optional
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * A partial type that only makes the keys specified required and the rest optional
 */
export type RequiredBy<T, K extends keyof T> = PartialBy<
  T,
  Exclude<keyof T, K>
> &
  Required<Pick<T, K>>;
