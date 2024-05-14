import { Button, Paper, Typography } from '@mui/material';
import { IntegrationProvider } from '@prisma/client';
import { Column, Row } from '@worksheets/ui/components/flex';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import React from 'react';

import { IntegrationLogo } from './integration-logo';

export const Integration: React.FC<{
  description: ConnectionDescriptionProps;
  action: ConnectionActionProps;
  title: string;
  identity?: string;
  provider: IntegrationProvider;
}> = ({ provider, title, description, action, identity }) => {
  return (
    <Paper
      sx={{
        p: 1,
        gap: 1,
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        border: (theme) => `2px solid ${theme.palette.grey[300]}`,
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', sm: 'center' },
      }}
    >
      <Row gap={{ xs: 1, sm: 2 }}>
        <IntegrationLogo provider={provider} />
        <Column>
          <Typography fontWeight={700} variant="body1">
            {title}
          </Typography>
          <ConnectionDescription {...description} identity={identity} />
        </Column>
      </Row>
      <ConnectionAction {...action} identity={identity} />
    </Paper>
  );
};

type ConnectionDescriptionProps = {
  isError: boolean;
  isLoading: boolean;
};

const ConnectionDescription: React.FC<
  ConnectionDescriptionProps & {
    identity?: string;
  }
> = ({ identity, isError, isLoading }) => {
  return (
    <Typography
      variant="body3"
      color={isError ? 'error.main' : 'text.secondary'}
      fontWeight={500}
    >
      {isLoading ? (
        'Loading...'
      ) : isError ? (
        'Connection is broken. Please reconnect.'
      ) : identity ? (
        <>
          Connected as <u>{identity}</u>
        </>
      ) : (
        'Not connected'
      )}
    </Typography>
  );
};

type ConnectionActionProps = {
  isLoading: boolean;
  isError: boolean;
  onConnect: () => Promise<void>;
  onDisconnect: () => Promise<void>;
};

const ConnectionAction: React.FC<
  ConnectionActionProps & {
    identity?: string;
  }
> = ({ isLoading, isError, identity, onConnect, onDisconnect }) => {
  const snackbar = useSnackbar();

  const handleClick = async () => {
    if (isLoading) return;

    if (!identity) {
      await onConnect();
      snackbar.success('Connected successfully.');
    } else {
      await onDisconnect();
      snackbar.success('Disconnected successfully.');
    }
  };

  return (
    <Button
      variant="arcade"
      color={isError || identity ? 'error' : 'primary'}
      size="small"
      disabled={isLoading}
      onClick={handleClick}
      sx={{ width: { xs: '100%', sm: 'fit-content' } }}
    >
      {isLoading
        ? 'Loading...'
        : isError
        ? 'Reconnect'
        : identity
        ? 'Disconnect'
        : 'Connect'}
    </Button>
  );
};
