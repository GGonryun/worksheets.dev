import { isMobileOrTabletDeviceBrowser } from '@worksheets/util-devices';
import { useEffect, useState } from 'react';

export const useDeviceChecks = () => {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  useEffect(() => {
    setIsMobileOrTablet(isMobileOrTabletDeviceBrowser());
  }, []);
  return { isMobileOrTablet: isMobileOrTablet };
};
