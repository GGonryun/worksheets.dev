import { TRPCError } from '@trpc/server';
import { viewports } from '@worksheets/data/viewports';
import { keysOf } from '@worksheets/util/objects';
import {
  GameDeviceSchema,
  GameOrientationSchema,
  GameViewportSchema,
  ViewportKeys,
} from '@worksheets/util/types';

export const computeViewportId = (
  devices: GameDeviceSchema[],
  orientations: GameOrientationSchema[]
): ViewportKeys => {
  const hasMobile = devices.includes('MOBILE');
  const hasDesktop = devices.includes('COMPUTER');
  const hasLandscape = orientations.includes('LANDSCAPE');
  const hasPortrait = orientations.includes('PORTRAIT');

  if (hasMobile && hasDesktop && hasLandscape && hasPortrait) {
    return 'ALL-DEVICES';
  }
  if (hasDesktop && hasLandscape && hasPortrait) {
    return 'COMPUTER-ONLY';
  }
  if (hasMobile && hasLandscape && hasPortrait) {
    return 'MOBILE-ONLY';
  }
  if (hasDesktop && hasMobile && hasLandscape) {
    return 'LANDSCAPE-ONLY';
  }
  if (hasDesktop && hasMobile && hasPortrait) {
    return 'PORTRAIT-ONLY';
  }
  if (hasDesktop && hasLandscape) {
    return 'DESKTOP-LANDSCAPE';
  }
  if (hasDesktop && hasPortrait) {
    return 'DESKTOP-PORTRAIT';
  }
  if (hasMobile && hasLandscape) {
    return 'MOBILE-LANDSCAPE';
  }
  if (hasMobile && hasPortrait) {
    return 'MOBILE-PORTRAIT';
  }

  throw new TRPCError({
    code: 'BAD_REQUEST',
    message: 'Invalid device selection',
  });
};

export const parseViewportId = (
  viewportId: string
): {
  viewport: GameViewportSchema;
  orientation: GameOrientationSchema[];
  devices: GameDeviceSchema[];
} => {
  if (!viewportId) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Viewport ID is required',
    });
  }

  const viewportKey = keysOf(viewports).find((key) => key === viewportId);
  if (!viewportKey) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Invalid viewport ID',
    });
  }

  const viewport = viewports[viewportKey];

  if (!viewport) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Invalid viewport configuration',
    });
  }

  return {
    viewport: 'RESPONSIVE',
    orientation: viewport.orientations,
    devices: viewport.devices,
  };
};
