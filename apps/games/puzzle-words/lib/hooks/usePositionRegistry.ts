import { useState } from 'react';
import { PositionRegistry, RegisterPositionHandler } from '../types';

/** Register positions of shapes on the screen. */
export const usePositions = () => {
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
