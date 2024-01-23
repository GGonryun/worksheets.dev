import { useState } from 'react';

export const ITEMS_PER_PAGE = 15;

export function usePagination<T>(list: T[], itemsPerPage: number) {
  const [page, setPage] = useState(0);

  const max = Math.ceil(list.length / itemsPerPage);

  const start = page * itemsPerPage;
  const last = start + itemsPerPage;

  const items = list.slice(start, last);

  console.log('items', items);

  return { page, setPage, max, items };
}
