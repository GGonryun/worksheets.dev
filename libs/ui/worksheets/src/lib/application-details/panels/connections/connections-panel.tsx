import { Button, CircularProgress, Paper } from '@mui/material';
import {
  GetApplicationDetailsResponse,
  ListApplicationMethodDetailsResponse,
} from '@worksheets/schemas-applications';
import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Add, Delete, List } from '@mui/icons-material';
import { Flex } from '@worksheets/ui/common';
import { ConnectionsDataTable } from './connections-data-table';
import { TinyLogo } from '../../../shared/tiny-logo';
import { useUser } from '@worksheets/util/auth/client';
import { SignUpFirstNotice } from './sign-up-first-notice';
import { useRouter } from 'next/router';
import { urls } from '../../../shared/urls';
import { trpc } from '@worksheets/trpc/ide';
import { UnbiasedConnectionSidecar } from '../../../connections-list/connections-sidecar/container';

export const ConnectionsPanel: React.FC<{
  app: GetApplicationDetailsResponse;
  methods: ListApplicationMethodDetailsResponse;
}> = ({ app }) => {
  const { push } = useRouter();
  const { user } = useUser();

  const utils = trpc.useContext();

  const { data: connections, isLoading } = trpc.connections.list.useQuery(
    {
      appId: app.appId,
    },
    {
      enabled: !!app.appId && !!user,
    }
  );

  const deleteConnection = trpc.connections.delete.useMutation();

  const [open, setOpen] = useState(false);
  const [connectionId, setConnectionId] = useState<string | undefined>();
  const [selectedConnections, setSelectedConnections] = useState<string[]>([]);

  const handleSidecarClose = () => {
    setConnectionId('');
    setOpen(false);
  };

  const handlePrimaryClick = () => {
    if (!user) {
      push('/login');
    } else {
      setOpen(true);
      setConnectionId('');
    }
  };

  const handleDeleteMulti = async (ids: string[]) => {
    await deleteConnection.mutateAsync({
      connectionIds: ids,
    });
    utils.connections.list.invalidate({ appId: app.appId });
    utils.connections.getDetails.invalidate({ appId: app.appId });
  };

  const handleDeleteSelected = async () => {
    if (!selectedConnections.length) return;
    await handleDeleteMulti(selectedConnections);
    setSelectedConnections([]);
  };

  const handleEdit = (id: string) => {
    setConnectionId(id);
    setOpen(true);
  };

  if (user && isLoading) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          m: 0,
          maxWidth: 1200,
          height: '100%',
          p: 3,
        }}
      >
        <Flex column gap={3}>
          <Flex spaceBetween>
            <Flex gap={2}>
              <TinyLogo
                borderless
                label="Connections"
                src="/icons/features/connections.svg"
                area={40}
              />
              <Typography variant="h5" fontWeight={900}>
                Manage connections
              </Typography>
            </Flex>
            <Flex gap={1}>
              {user && (
                <Button
                  size="small"
                  variant="outlined"
                  color="inherit"
                  startIcon={<List />}
                  href={urls.app.connections}
                  sx={(theme) => ({
                    backgroundColor: theme.palette.background.paper,
                    borderColor: theme.palette.grey[400],
                    '&:hover': {
                      backgroundColor: theme.palette.grey[300],
                      borderColor: theme.palette.grey[500],
                    },
                  })}
                >
                  View All
                </Button>
              )}
              {selectedConnections.length ? (
                <Button
                  size="small"
                  color="error"
                  variant="contained"
                  startIcon={<Delete />}
                  onClick={handleDeleteSelected}
                >
                  Delete All
                </Button>
              ) : (
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<Add />}
                  onClick={handlePrimaryClick}
                >
                  {user ? 'Connect' : 'Sign up'}
                </Button>
              )}
            </Flex>
          </Flex>
          <Paper
            variant="outlined"
            sx={{
              backgroundColor: 'background.default',
            }}
          >
            {user ? (
              <ConnectionsDataTable
                onDelete={(id) => handleDeleteMulti([id])}
                onEdit={(id) => handleEdit(id)}
                rows={connections ?? []}
                onSelectionChange={setSelectedConnections}
              />
            ) : (
              <SignUpFirstNotice />
            )}
          </Paper>
        </Flex>
      </Box>
      <UnbiasedConnectionSidecar
        appId={app.appId}
        connectionId={connectionId}
        open={open}
        onClose={handleSidecarClose}
      />
    </>
  );
};
