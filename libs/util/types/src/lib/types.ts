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

export type StringLiteral<T> = T extends string
  ? string extends T
    ? never
    : T
  : never;

export type TypesToObjectMapper<Union extends string | number | symbol, T> = {
  [Prop in Union]: T;
};

export type UnionToIntersection<U> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (U extends any ? (k: U) => void : never) extends (k: infer I) => void
    ? I
    : never;

/**
 * Split a string by a delimiter.
 * @example
 * type T0 = Split<'a-b-c', '-'>; // ['a', 'b', 'c']
 * type T1 = Split<'a-b-c', '.'>; // ['a-b-c']
 */
export type Split<S extends string, D extends string> = string extends S
  ? string[]
  : S extends ''
  ? []
  : S extends `${infer T}${D}${infer U}`
  ? [T, ...Split<U, D>]
  : [S];

export type Nullable<T> = { [K in keyof T]: T[K] | null };

export type DeepNullable<T> = {
  [K in keyof T]: DeepNullable<T[K]> | null;
};

export type NonEmptyArray<T> = [T, ...T[]];

export type NativeEnum<T> = T[keyof T];
