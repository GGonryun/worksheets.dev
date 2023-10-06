import { useState } from 'react';
import { useEventListener } from './useEventListener';
import { debounce } from '../utils';

export const useResizing = (delay: number) => {
  const [resizing, setResizing] = useState(false);
  const resizer = debounce(() => {
    setResizing(false);
  }, 1000);

  useEventListener('resize', () => {
    setResizing(true);
    resizer();
  });
  return resizing;
};
