import { useState, useEffect } from 'react';

const getOrientation = (): OrientationType => {
  if (window.screen == null || window.screen.orientation == null) {
    if (window.innerHeight > window.innerWidth) return 'portrait-primary';
    else return 'landscape-primary';
  }
  return window.screen.orientation.type;
};

export const useDeviceOrientation = () => {
  const [orientation, setOrientation] = useState(getOrientation());

  const updateOrientation = () => {
    setOrientation(getOrientation());
  };

  useEffect(() => {
    window.addEventListener('orientationchange', updateOrientation);
    return () => {
      window.removeEventListener('orientationchange', updateOrientation);
    };
  }, []);

  return orientation;
};
