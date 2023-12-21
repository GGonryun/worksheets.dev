import { useState, useEffect, useCallback } from 'react';

const getOrientation = (): OrientationType => {
  // a work around when screen.orientation is not available which happens to ios-safari
  if (window.screen == null || window.screen.orientation == null) {
    if (window.innerHeight > window.innerWidth) return 'portrait-primary';
    else return 'landscape-primary';
  }

  return window.screen.orientation.type;
};

export const useDeviceOrientation = () => {
  const [orientation, setOrientation] = useState(getOrientation());

  const updateOrientation = useCallback(() => {
    setOrientation(getOrientation());
  }, []);

  useEffect(() => {
    // ios-safari doesn't fire the orientationchange event consistently. this should make it
    // more reliable across devices.
    window.addEventListener('resize', updateOrientation);
    return () => {
      window.removeEventListener('resize', updateOrientation);
    };
  }, [updateOrientation]);

  return orientation;
};
