import { useRef, useState } from 'react';

export const ITEMS_PER_PAGE = 20;

export function usePagination<T>(list: T[], itemsPerPage = ITEMS_PER_PAGE) {
  const ref = useRef<HTMLDivElement>(null);

  const [page, setPage] = useState(0);

  const max = Math.ceil(list.length / itemsPerPage);

  const start = page * itemsPerPage;
  const last = start + itemsPerPage;

  const items = list.slice(start, last);

  return { page, setPage, max, items, ref };
}
