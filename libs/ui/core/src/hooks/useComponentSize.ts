import { useEffect, useRef, useState } from 'react';
import { useWindowSize } from './useWindowResize';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

export type ComponentDimensions = {
  width: number;
  height: number;
  x: number;
  y: number;
};

export const useComponentSize = () => {
  const targetRef = useRef<HTMLElement | null>(null);

  const [dimensions, setDimensions] = useState<ComponentDimensions>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (!targetRef.current) return;
    const resizeObserver = new ResizeObserver(() => {
      setDimensions({
        x: targetRef.current?.offsetLeft ?? 0,
        y: targetRef.current?.offsetTop ?? 0,
        width: targetRef.current?.offsetWidth ?? 0,
        height: targetRef.current?.offsetHeight ?? 0,
      });
    });
    resizeObserver.observe(targetRef.current);
    return () => resizeObserver.disconnect(); // clean up
  }, []);

  const windowSize = useWindowSize();
  useIsomorphicLayoutEffect(() => {
    if (targetRef.current) {
      setDimensions({
        x: targetRef.current.offsetLeft,
        y: targetRef.current.offsetTop,
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight,
      });
    }
  }, [windowSize]);

  return { ref: targetRef, dimensions };
};
