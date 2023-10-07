import { Registry, Rectangle } from '@worksheets/ui-games';
import { useState } from 'react';

export const useGrid = () => {
  const [registry, setRegistry] = useState<Registry>({});

  const register = (index: number, rect?: DOMRectReadOnly) => {
    if (!rect) return;

    const rectangle: Rectangle = {
      bottom: rect.bottom,
      left: rect.left,
      right: rect.right,
      top: rect.top,
      height: rect.height,
      width: rect.width,
      x: rect.x,
      y: rect.y,
      center: {
        x: rect.x + rect.width / 2,
        y: rect.y + rect.height / 2,
      },
    };

    setRegistry((registry) => ({ ...registry, [index]: rectangle }));
  };

  // check a square to see the size of the square.
  const getSize = (): number => {
    const rect = Object.values(registry);

    if (rect.length === 0) return 0;

    return Object.values(registry)[0].width;
  };

  return {
    register,
    getSize,
    registry,
  };
};
