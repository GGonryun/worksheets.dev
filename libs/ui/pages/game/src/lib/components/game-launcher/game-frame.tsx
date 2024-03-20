import { Box, Typography } from '@mui/material';
import common from '@worksheets/assets-common';
import Image from 'next/image';
import { forwardRef } from 'react';

import classes from './game-frame.module.scss';

export type GameFrameProps = { url: string };

export const GameFrame = forwardRef<HTMLIFrameElement, GameFrameProps>(
  ({ url }, ref) => {
    return (
      <Box width="100%" height="100%" position="relative">
        <Box className={classes.placeholder}>
          <Image
            src={common.charityGames.logos.square}
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
          allow={`accelerometer; magnetometer; gyroscope; autoplay; payment; fullscreen; microphone; clipboard-read; clipboard-write 'self' ${url}`}
        />
      </Box>
    );
  }
);

GameFrame.displayName = 'GameFrame';
