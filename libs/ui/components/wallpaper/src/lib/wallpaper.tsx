import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import Image from 'next/image';
import React from 'react';

export const WebsiteBackground: React.FC = () => (
  <FullscreenBox overflow="hidden" className={'website-content'}>
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
