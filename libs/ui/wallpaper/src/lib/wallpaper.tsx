import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import Image from 'next/image';
import React from 'react';

const WALLPAPER_URL = '/common/wallpaper/coins.png';

export const WebsiteBackground: React.FC = () => (
  <FullscreenBox overflow="hidden">
    <Box
      sx={{
        zIndex: -5,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `radial-gradient(circle, rgba(43,217,255,1) 0%, rgba(13,106,215,1) 50%, rgba(0,33,71,1) 100%)`,
      }}
    />
    <Box
      sx={{
        zIndex: -4,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: `rgb(43,217,255)`,
        backgroundImage: `url('${WALLPAPER_URL}')`,
        backgroundBlendMode: 'color-dodge',
        backgroundRepeat: 'repeat',
        opacity: 0.1,
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

// <Box
// sx={{
//   display: hideBlobs ? 'none' : 'block',
//   zIndex: -1,
//   position: 'absolute',
//   top: '-20%',
//   left: -64,
//   width: '100%',
//   height: '100%',
//   opacity: 1,
// }}
// >
// <BlobOne />
// </Box>
// <Box
// sx={{
//   display: hideBlobs ? 'none' : 'block',
//   zIndex: -1,
//   position: 'absolute',
//   top: '25%',
//   right: -64,
//   flexShrink: 0,
//   opacity: 1,
// }}
// >
// <BlobTwo />
// </Box>
// <Box
// sx={{
//   display: hideBlobs ? 'none' : 'block',
//   zIndex: -1,
//   position: 'absolute',
//   top: 'max(1000px, 70%)',
//   left: -64,
//   width: '100%',
//   height: '100%',
//   opacity: 1,
// }}
// >
// <BlobThree />
// </Box>
