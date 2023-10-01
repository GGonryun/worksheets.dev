import { StaticImageData } from 'next/image';

export const base = (bg: StaticImageData) => {
  return {
    '::before': {
      zIndex: -1,
      filter: 'blur(3px)',
      content: '""',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  };
};
