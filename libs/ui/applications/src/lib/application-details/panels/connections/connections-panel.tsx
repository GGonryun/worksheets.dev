import { CircularProgress, Paper } from '@mui/material';
import {
  GetApplicationDetailsResponse,
  ListApplicationMethodDetailsResponse,
} from '@worksheets/schemas-applications';
import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Add, Delete, List } from '@mui/icons-material';
import {
  SignUpFirstNotice,
  urls,
  useLayout,
  useUser,
} from '@worksheets/ui/common';
import { Flex } from '@worksheets/ui-core';
import { useRouter } from 'next/router';
import { trpc } from '@worksheets/trpc/ide';
import { TinyButton, TinyLogo } from '@worksheets/ui-basic-style';
import { ProjectSelector, useProjectId } from '@worksheets/ui-projects';
import {
  ConnectionsDataTable,
  ConnectionSidecar,
} from '@worksheets/ui/connections';

export const ConnectionsPanel: React.FC<{
  app: GetApplicationDetailsResponse;
  methods: ListApplicationMethodDetailsResponse;
}> = ({ app }) => {
  const { push } = useRouter();
  const { user } = useUser();
  const { isTablet } = useLayout();
  const [projectId] = useProjectId();

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
    setConnectionId(undefined);
    setOpen(false);
    console.log('editing and setting new connection 3');
  };

  const handlePrimaryClick = () => {
    if (!user) {
      push('/login');
    } else {
      setOpen(true);
      setConnectionId(undefined);
      console.log('editing and setting new connection 2');
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
    console.log('editing and setting new connection 1');
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
      <Flex column gap={3} py={3}>
        <Flex spaceBetween wrap={isTablet} gap={2}>
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
              <>
                <Paper elevation={0} sx={{ maxWidth: 200 }}>
                  <ProjectSelector variant="outlined" />
                </Paper>
                <Paper elevation={0}>
                  <TinyButton
                    size="small"
                    variant="outlined"
                    disabled={!projectId}
                    color="inherit"
                    startIcon={<List />}
                    href={
                      projectId
                        ? urls.app.project(projectId).connections
                        : urls.app.projects
                    }
                  >
                    View All
                  </TinyButton>
                </Paper>
              </>
            )}
            {selectedConnections.length ? (
              <TinyButton
                size="small"
                color="error"
                variant="contained"
                startIcon={<Delete />}
                onClick={handleDeleteSelected}
              >
                Delete All
              </TinyButton>
            ) : (
              <TinyButton
                size="small"
                variant="contained"
                disabled={!projectId}
                startIcon={<Add />}
                onClick={handlePrimaryClick}
              >
                {user ? 'Connect' : 'Sign up'}
              </TinyButton>
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
              onEdit={(opts) => handleEdit(opts.connectionId)}
              rows={connections ?? []}
              onSelectionChange={setSelectedConnections}
            />
          ) : (
            <SignUpFirstNotice />
          )}
        </Paper>
      </Flex>
      <ConnectionSidecar
        appId={app.appId}
        connectionId={connectionId}
        open={open}
        onClose={handleSidecarClose}
        onSelectApp={() =>
          alert(
            'TODO: support app selection from application connections panel'
          )
        }
        onSelectConnection={setConnectionId}
      />
    </>
  );
};
