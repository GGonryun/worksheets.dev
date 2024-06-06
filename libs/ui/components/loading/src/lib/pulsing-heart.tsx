import { Box, Typography } from '@mui/material';
import { CharityGamesLogo } from '@worksheets/icons/native';
import { Column } from '@worksheets/ui/components/flex';
import { useMediaQuery } from '@worksheets/ui/hooks/use-media-query';
import { useInterval } from '@worksheets/ui-core';
import React from 'react';

import { LOADING_INTERVAL, selectRandomLoadingMessage } from './messages';
import styles from './pulsing-heart.module.scss';

export const PulsingLogo: React.FC<{
  hideMessage?: boolean;
  message?: string;
  offset?: number;
  size?: number;
}> = (props) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [message, setMessage] = React.useState(props.message ?? 'Loading...');
  const size = props.size ?? (isMobile ? 64 : 92);

  useInterval(() => {
    if (!props.hideMessage || !props.message) {
      setMessage(selectRandomLoadingMessage());
    }
  }, LOADING_INTERVAL.FAST);

  return (
    <Column alignItems="center">
      <Box className={styles['pulsing']} mb={props.offset}>
        <CharityGamesLogo size={size} />
      </Box>
      {!props.hideMessage && (
        <Typography variant="body3" fontWeight={700} textAlign="center" mt={-2}>
          {message}
        </Typography>
      )}
    </Column>
  );
};
