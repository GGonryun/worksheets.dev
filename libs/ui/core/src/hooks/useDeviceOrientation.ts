import { useState, useEffect } from 'react';

const getOrientation = () => window.screen.orientation.type;

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
