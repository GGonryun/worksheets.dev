import { MutableRefObject, useEffect, useRef, useState } from 'react';

export const useResizeObserver = <T extends HTMLElement>(): [
  MutableRefObject<T | null>,
  { width: number; height: number }
] => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const ref = useRef(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === ref.current) {
          const { width, height } = entry.contentRect;
          console.log('resize');
          setDimensions({ width, height });
        }
      }
    });

    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        resizeObserver.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, dimensions];
};
