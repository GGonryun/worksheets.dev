import { StaticImageData } from 'next/image';

export const base = (bg: StaticImageData) => {
  return {
    '::before': {
      zIndex: -1,
      content: '""',
      backgroundImage: `url(${bg.src})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      opacity: 0.7,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  };
};
