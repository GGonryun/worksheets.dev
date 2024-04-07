type EnumLike = Record<string, string | number>;

// takes an enum and returns an object with the values as a type union array
type EnumToUnion<T> = T[keyof T];

// convert keys of an enum to it's values
type EnumToRecord<T> = T extends EnumLike
  ? Record<EnumToUnion<T>, string | number>
  : never;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type OmitFirst<T extends any[]> = T extends [any, ...infer R] ? R : never;

type Split<S extends string, D extends string> = string extends S
  ? string[]
  : S extends ''
  ? []
  : S extends `${infer T}${D}${infer U}`
  ? [T, ...Split<U, D>]
  : [S];

type BracketToRecord<T extends string[]> = {
  [K in T[number] as K extends `[${infer Key}]` ? Key : never]: string | number;
};

type ParamDictionary<T extends string> = BracketToRecord<
  OmitFirst<Split<T, '/'>>
>;

type OmitParamsIfEmpty<T> = keyof T extends never
  ? { params?: never }
  : { params: T };

type OmitQueryIfEmpty<T> = T extends EnumLike
  ? { query?: Partial<EnumToRecord<T>> }
  : { query?: never };

type OmitBookmarkIfEmpty<T> = T extends EnumLike
  ? { bookmark?: EnumToUnion<T> }
  : { bookmark?: never };

type CreatePathOptions<
  TPath extends string,
  TBookmarks,
  TQuery
> = OmitParamsIfEmpty<ParamDictionary<TPath>> &
  OmitQueryIfEmpty<TQuery> &
  OmitBookmarkIfEmpty<TBookmarks>;

export type CreatePathFunction<TPath extends string, TBookmarks, TQuery> = (
  opts?: CreatePathOptions<TPath, TBookmarks, TQuery>
) => string;

export type Route<TPath extends string, TBookmarks, TQuery, TRoutes> = {
  raw: {
    path: TPath;
    url: string;
  };
  url: CreatePathFunction<TPath, TBookmarks, TQuery>;
  path: CreatePathFunction<TPath, TBookmarks, TQuery>;
} & TRoutes;
