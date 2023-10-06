import { usePositionRegistry } from '@worksheets/ui-core';
import { isInRect } from '@worksheets/util-shapes';
import { PanHandlers } from 'framer-motion';

type UseIntersectionObserver = {
  onIntersect: (index: number) => void;
};

/**
 * Detects intersections between the panning point and the registered positions.
 */
export const useIntersectionObserver = ({
  onIntersect,
}: UseIntersectionObserver) => {
  const { positions, register } = usePositionRegistry();

  const calculateIntersections: PanHandlers['onPan'] = (_, info) => {
    if (Object.keys(positions).length) {
      // for each shape that is registered.
      for (const stringKey in positions) {
        if (Number.isNaN(stringKey)) {
          throw new Error(`found an invalid key in letter map: ${stringKey}`);
        }

        const key = Number(stringKey);
        const value = positions[key];
        // check if our panning point is intersecting the value.
        // debug('checking intersection against', key);
        const intersecting = isInRect(info.point, value);
        // if we haven't already intersected this point.
        if (intersecting) {
          // add to the end of our intersection list.
          onIntersect(key);
        }
      }
    }
    return false;
  };

  return {
    detect: calculateIntersections,
    register,
  };
};
