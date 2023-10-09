import { useState } from 'react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

// Returns [width, height]
export function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useIsomorphicLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}
