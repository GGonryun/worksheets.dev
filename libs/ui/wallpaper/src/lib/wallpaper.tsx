import { styled } from '@mui/material';
import Box from '@mui/material/Box';
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
        backgroundSize: '10%',
        backgroundImage: `url('${WALLPAPER_URL}')`,
        backgroundBlendMode: 'color-dodge',
        backgroundRepeat: 'repeat',
        opacity: 0.1,
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
