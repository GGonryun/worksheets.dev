import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import Image from 'next/image';
import React from 'react';

import { WALLPAPER_IMAGES } from './const';
import { WallpaperType } from './types';

export const WebsiteBackground: React.FC<{ wallpaper: WallpaperType }> = ({
  wallpaper,
}) => (
  <FullscreenBox
    overflow="hidden"
    sx={{
      '&::before': {
        content: '""',
        position: 'absolute',
        display: 'block',
        opacity: 0.1,
        top: 0,
        left: 0,
        zIndex: -1,
        width: '100%',
        height: '100%',
        backgroundColor: (theme) => theme.palette.background.wallpaper,
        backgroundImage: `url('${WALLPAPER_IMAGES[wallpaper]}')`,
        backgroundBlendMode: 'color-dodge',
        backgroundRepeat: 'repeat',
      },
    }}
  >
    <Image
      src={'/common/wallpaper/blob-1.png'}
      alt="Wallpaper"
      width={971}
      height={1037}
      priority
      style={{
        opacity: 0.6,
        position: 'absolute',
        top: '-5%',
        left: -750,
      }}
    />
    <Image
      src={'/common/wallpaper/blob-1.png'}
      alt="Wallpaper"
      width={971}
      height={1037}
      priority
      style={{
        opacity: 0.6,
        position: 'absolute',
        top: '30%',
        right: -750,
      }}
    />
    <Image
      src={'/common/wallpaper/blob-2.png'}
      alt="Wallpaper"
      width={1162}
      height={1335}
      priority
      style={{
        opacity: 0.6,
        position: 'absolute',
        top: 'max(1000px, 80%)',
        left: -800,
      }}
    />
  </FullscreenBox>
);

const FullscreenBox = styled(Box)({
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: -1,
});
