import { useEffect, useState } from 'react';

export const usePseudoPagination = <T,>(items: T[], rowsPerPage = 10) => {
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState<T[]>([]);

  useEffect(() => {
    setRows(items.slice(page * rowsPerPage, (page + 1) * rowsPerPage));
  }, [items, page, rowsPerPage]);

  const onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => void = (_, page) => {
    setPage(page);
  };
  return {
    onPageChange,
    rows,
    page,
    rowsPerPage,
    count: items.length,
  };
};
