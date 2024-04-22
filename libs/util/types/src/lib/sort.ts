export const SORT_DIRECTION = { ASC: 'asc', DESC: 'desc' } as const;
export type SortDirection = keyof typeof SORT_DIRECTION;
