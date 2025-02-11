'use client';

import { Paper } from '@mui/material';
import { ErrorComponent } from '@worksheets/ui/components/errors';
import { AbsolutelyCentered } from '@worksheets/ui-core';
import React from 'react';

export const ErrorScreen: React.FC<{
  message?: string;
  title?: string;
  header?: string;
  onRetry?: () => void;
}> = ({ title, header, message, onRetry }) => {
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
        <ErrorComponent
          title={title}
          header={header}
          message={message}
          onRetry={onRetry}
        />
      </Paper>
    </AbsolutelyCentered>
  );
};
