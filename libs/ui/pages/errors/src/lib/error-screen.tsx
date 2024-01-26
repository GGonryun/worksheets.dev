import { Paper } from '@mui/material';
import { AbsolutelyCentered } from '@worksheets/ui-core';
import React from 'react';

import { ErrorComponent } from './error-component';

export const ErrorScreen: React.FC<{
  message?: string;
  onRetry?: () => void;
}> = ({ message, onRetry }) => {
  return (
    <AbsolutelyCentered pointerEvents="auto">
      <Paper
        elevation={10}
        sx={{
          m: 2,
          p: 2,
          mb: { xs: 8, sm: 4 },
          backgroundColor: (theme) => theme.palette.background['solid-blue'],
        }}
      >
        <ErrorComponent message={message} onRetry={onRetry} />
      </Paper>
    </AbsolutelyCentered>
  );
};
