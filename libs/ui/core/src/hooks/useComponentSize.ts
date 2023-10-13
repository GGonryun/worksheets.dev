import { useRef, useState, useLayoutEffect } from 'react';
import { useWindowSize } from './useWindowResize';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

export const useComponentSize = () => {
  const targetRef = useRef<HTMLElement | null>(null);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const windowSize = useWindowSize();
  useIsomorphicLayoutEffect(() => {
    if (targetRef.current) {
      setDimensions({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight,
      });
    }
  }, [windowSize]);

  return { ref: targetRef, dimensions };
};
