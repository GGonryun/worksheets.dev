import { Paper, Typography } from '@mui/material';
import {
  emptyLoadingMessage,
  LOADING_INTERVAL,
  LoadingBar,
  selectRandomLoadingJoke,
} from '@worksheets/ui/components/loading';
import { useMediaQuery } from '@worksheets/ui/hooks/use-media-query';
import { AbsolutelyCentered, useInterval } from '@worksheets/ui-core';
import React, { useEffect, useState } from 'react';

export const LoadingScreen: React.FC<{ message?: string }> = ({ message }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [loadingMessage, setLoadingMessage] = useState<string>(
    message ?? emptyLoadingMessage
  );

  // set a random message
  useEffect(() => {
    if (message) return;

    setLoadingMessage(selectRandomLoadingJoke());
    // only happens once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // then change it every now and then
  useInterval(() => {
    if (message) return;
    setLoadingMessage(selectRandomLoadingJoke());
  }, LOADING_INTERVAL.SLOW);

  return (
    <AbsolutelyCentered blur>
      <Paper
        elevation={10}
        sx={{
          display: 'grid',
          placeItems: 'center',
          m: 2,
          p: 2,
          mb: { xs: 12, sm: 6 },
          textAlign: 'center',
          maxWidth: 400,
        }}
      >
        <LoadingBar />
        <Typography variant={isMobile ? 'body3' : 'body2'}>
          {loadingMessage}
        </Typography>
      </Paper>
    </AbsolutelyCentered>
  );
};
