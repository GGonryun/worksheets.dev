import { useState } from 'react';

export type RegisterPositionHandler = (
  index: number,
  rect?: DOMRectReadOnly
) => void;

/**
 * A registry of positions for each shape. A number should be used as the index of the shape.
 */
export type PositionRegistry = Record<number, DOMRectReadOnly>;

/** Register positions of shapes on the screen. */
export const usePositionRegistry = () => {
  const [positions, setPositions] = useState<PositionRegistry>({});

  const register: RegisterPositionHandler = (index, rect) => {
    if (rect) {
      // add new position.
      setPositions((letters) => ({ ...letters, [index]: rect }));
    }
  };

  return {
    positions,
    register,
  };
};
