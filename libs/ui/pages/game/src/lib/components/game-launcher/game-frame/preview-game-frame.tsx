import { Box, Typography } from '@mui/material';
import { PulsingIcon } from '@worksheets/ui/components/loading';
import React, { useRef } from 'react';

import classes from './game-frame.module.scss';
import { GameInternalFrame } from './game-internal-frame';

export const PreviewGameFrame: React.FC<{
  url: string;
}> = ({ url }) => {
  const frameRef = useRef<HTMLIFrameElement | null>(null);

  return (
    <Box width="100%" height="100%" position="relative">
      <Box className={classes.placeholder}>
        <PulsingIcon size={164} />
        <Typography variant="h4" component="h1" color="error.main">
          Downloading Game...
        </Typography>
      </Box>
      <GameInternalFrame frameRef={frameRef} url={url} />
    </Box>
  );
};
