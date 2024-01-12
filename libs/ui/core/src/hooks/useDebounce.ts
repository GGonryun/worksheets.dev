import { useMemo } from 'react';

import { debounce } from '../utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebounce(delay: number, fn: any) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => debounce(fn, delay), []);
}
