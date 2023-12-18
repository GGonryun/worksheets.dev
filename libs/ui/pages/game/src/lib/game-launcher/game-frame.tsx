import { forwardRef } from 'react';
import classes from './game-frame.module.scss';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

export type GameFrameProps = { url: string };

export const GameFrame = forwardRef<HTMLIFrameElement, GameFrameProps>(
  ({ url }, ref) => {
    return (
      <Box width="100%" height="100%" position="relative">
        <iframe
          ref={ref}
          style={{
            userSelect: 'none',
            zIndex: 1,
          }}
          title="game-frame"
          src={url}
          className={classes.iframe}
          // sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-scripts allow-same-origin allow-downloads allow-gamepad"
          // allow="autoplay; fullscreen *; geolocation; microphone; camera; midi; xr-spatial-tracking; gamepad; gyroscope; accelerometer; cross-origin-isolated; keyboard-map *; clipboard-write;"
        />
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
      </Box>
    );
  }
);

GameFrame.displayName = 'GameFrame';
