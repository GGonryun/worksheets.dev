import { useDeviceOrientation } from '@worksheets/ui-core';
import { GameSchema } from '@worksheets/util/types';
import { isMobileOrTabletDeviceBrowser } from '@worksheets/util-devices';

export const useDeviceInformation = (viewport: GameSchema['viewport']) => {
  const isMobileOrTablet = isMobileOrTabletDeviceBrowser();
  const orientation = useDeviceOrientation();

  const isPortrait =
    orientation === 'portrait-primary' || orientation === 'portrait-secondary';

  const isLandscape =
    orientation === 'landscape-primary' ||
    orientation === 'landscape-secondary';

  const supportsMobile =
    viewport.devices.includes('MOBILE') && isMobileOrTablet;
  const supportsDesktop =
    viewport.devices.includes('COMPUTER') && !isMobileOrTablet;

  const showNoDesktopOverlay = !isMobileOrTablet && !supportsDesktop;

  const showNoMobileOverlay = isMobileOrTablet && !supportsMobile;
  const showNoPortraitOverlay =
    isMobileOrTablet &&
    isPortrait &&
    !viewport.orientations.includes('PORTRAIT');
  const showNoLandscapeOverlay =
    isMobileOrTablet &&
    !viewport.orientations?.includes('LANDSCAPE') &&
    isLandscape;

  return {
    isMobileOrTablet,
    orientation,
    supportsDesktop,
    supportsMobile,
    showNoDesktopOverlay,
    showNoMobileOverlay,
    showNoPortraitOverlay,
    showNoLandscapeOverlay,
    canPlay:
      !showNoDesktopOverlay &&
      !showNoMobileOverlay &&
      !showNoPortraitOverlay &&
      !showNoLandscapeOverlay,
  };
};
