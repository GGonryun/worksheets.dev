import { forwardRef } from 'react';
import classes from './game-frame.module.scss';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

export type GameFrameProps = { url: string };

export const GameFrame = forwardRef<HTMLIFrameElement, GameFrameProps>(
  ({ url }, ref) => {
    return (
      <Box width="100%" height="100%" position="relative">
        <Box className={classes.placeholder}>
          <Image
            src={'/common/charity-games/logos/square.png'}
            alt="charity games logo"
            height={164}
            width={164}
          />
          <Typography variant="h4" component="h1">
            Loading...
          </Typography>
        </Box>
        <iframe
          ref={ref}
          style={{
            userSelect: 'none',
            zIndex: 1,
          }}
          id="game-frame"
          name="game-frame"
          title="game-frame"
          src={url}
          className={classes.iframe}
          sandbox="allow-storage-access-by-user-activation allow-forms allow-orientation-lock allow-pointer-lock allow-presentation allow-scripts allow-same-origin allow-downloads"
          // allow="autoplay allow-scripts allow-same-origin fullscreen camera gamepad keyboard-map * xr-spatial-tracking clipboard-write"
        />
      </Box>
    );
  }
);

GameFrame.displayName = 'GameFrame';
