'use client';

import { useCallback, useEffect, useState } from 'react';

import { useIsClient } from '../providers';

const getOrientation = (): OrientationType => {
  // a work around when screen.orientation is not available which happens to ios-safari
  if (window.screen == null || window.screen.orientation == null) {
    if (window.innerHeight > window.innerWidth) return 'portrait-primary';
    else return 'landscape-primary';
  }

  return window.screen.orientation.type;
};

export const useDeviceOrientation = () => {
  const isClient = useIsClient();
  const [orientation, setOrientation] = useState('portrait-primary');

  const updateOrientation = useCallback(() => {
    if (!isClient) return;
    setOrientation(getOrientation());
  }, [isClient]);

  useEffect(() => {
    if (!isClient) return;
    // ios-safari doesn't fire the orientationchange event consistently. this should make it
    // more reliable across devices.
    window.addEventListener('resize', updateOrientation);
    return () => {
      window.removeEventListener('resize', updateOrientation);
    };
  }, [isClient, updateOrientation]);

  return orientation;
};
