import { useState } from 'react';

export const useOnHover = () => {
  const [hover, setHover] = useState(false);

  return {
    hover,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
  };
};

export type HoverProps = ReturnType<typeof useOnHover>;
