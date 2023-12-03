import debounce from 'lodash/debounce';
import { useMemo } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebounce(delay: number, fn: any) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => debounce(fn, delay, { trailing: true }), []);
}
