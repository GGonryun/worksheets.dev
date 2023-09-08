import {
  Box,
  Button,
  Collapse,
  IconButton,
  Link,
  Paper,
  Typography,
} from '@mui/material';
import { ConnectionsDataTable } from './connections-data-table';
import { trpc } from '@worksheets/trpc/ide';
import { ApplicationCard } from '../applications-gallery/application-card';
import Grid from '@mui/material/Unstable_Grid2';
import { Flex } from '@worksheets/ui-core';
import { Add, Delete, ExpandLess, ExpandMore } from '@mui/icons-material';
import { useState } from 'react';
import { UnbiasedConnectionSidecar } from './connections-sidecar/container';
import { TinyLogo } from '@worksheets/ui-basic-style';
import { useLayout, useUser } from '@worksheets/ui/common';
import { FeatureLayout } from '../feature-layout';

export const ConnectionsList: React.FC<{ appId: string }> = ({
  appId: initialAppId,
}) => {
  const [selections, setSelections] = useState<string[]>([]);
  const { user } = useUser();
  const { data: applications } = trpc.applications.list.useQuery({
    gallery: true,
    featured: true,
  });

  const { data: connections, isLoading } = trpc.connections.list.useQuery(
    {},
    {
      enabled: !!user,
    }
  );

  const deleteConnection = trpc.connections.delete.useMutation();

  const { isMobile } = useLayout();

  const utils = trpc.useContext();

  const [showFeaturedApps, setShowFeaturedApps] = useState(!isMobile);
  const [showConnectionSidecar, setShowConnectionSidecar] = useState(
    !!initialAppId
  );

  const [appId, setAppId] = useState<string | undefined>(initialAppId);
  const [connectionId, setConnectionId] = useState<string | undefined>(
    undefined
  );

  const handleDeleteSelections = async (connectionIds: string[]) => {
    if (
      // eslint-disable-next-line no-restricted-globals
      confirm(
        `Are you sure you want to delete ${connectionIds.length} connection${
          connectionIds.length > 1 ? 's' : ''
        }?`
      )
    ) {
      await deleteConnection.mutateAsync({
        connectionIds,
      });

      utils.connections.list.invalidate({ appId });
      for (const connectionId of connectionIds) {
        utils.connections.getDetails.invalidate({ appId, connectionId });
      }
    }
  };

  const handleEdit = (opt: { appId: string; connectionId: string }) => {
    setAppId(opt.appId);
    setConnectionId(opt.connectionId);
    setShowConnectionSidecar(true);
  };

  const handleSidecarClose = () => {
    setAppId(undefined);
    setConnectionId(undefined);
    setShowConnectionSidecar(false);
  };

  const handleCreateConnection = () => {
    setAppId(undefined);
    setConnectionId(undefined);
    setShowConnectionSidecar(true);
  };

  return (
    <>
      <FeatureLayout
        HeaderProps={{
          title: 'Explore Connections',
          subtitle:
            'Connections let you connect your API to external services. You can use them to authenticate users, send emails, and more.',
          src: '/icons/features/connections.svg',
        }}
      >
        <Box>
          <Flex column>
            <Flex gap={1}>
              <TinyLogo
                src={'/art/80s/stars.svg'}
                borderless
                label="Featured applications"
                area={42}
              />
              <Flex fullWidth column>
                <Link
                  underline="hover"
                  color="inherit"
                  onClick={() => setShowFeaturedApps((o) => !o)}
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  <Typography variant="h5" fontWeight={900}>
                    Featured Applications
                  </Typography>
                </Link>
                <Typography variant="body2" color="text.secondary">
                  These applications are popular with our users. Click on one to
                  learn more or create a connection
                </Typography>
              </Flex>
              <IconButton
                size="small"
                onClick={() => setShowFeaturedApps((o) => !o)}
              >
                {showFeaturedApps ? (
                  <ExpandLess fontSize="large" />
                ) : (
                  <ExpandMore fontSize="large" />
                )}
              </IconButton>
            </Flex>
            <Collapse in={showFeaturedApps}>
              <Box pt={2}>
                <Grid container spacing={2}>
                  {applications?.map((a) => (
                    <Grid xs={12} sm={6} md={4} lg={3} xl={3} key={a.id}>
                      <ApplicationCard application={a} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Collapse>
          </Flex>

          <Flex column py={3} gap={2}>
            <Flex spaceBetween gap={1}>
              <Flex gap={1} pr={2}>
                <TinyLogo
                  src={'/art/communication-44/scheme.svg'}
                  borderless
                  label="Connected applications"
                  area={42}
                />
                <Flex column>
                  <Typography variant="h5" fontWeight={900}>
                    All Connections
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Every connection you create gets a unique atomic ID. This is
                    the ID you use in your code to reference the connection.
                  </Typography>
                </Flex>
              </Flex>
              {selections.length > 0 ? (
                <Button
                  variant="contained"
                  size="small"
                  color="error"
                  startIcon={<Delete />}
                  sx={{ minWidth: 100 }}
                  onClick={() => handleDeleteSelections(selections)}
                >
                  Delete
                </Button>
              ) : (
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<Add />}
                  sx={{ minWidth: 100 }}
                  onClick={handleCreateConnection}
                >
                  Create
                </Button>
              )}
            </Flex>

            <Paper variant="outlined">
              <ConnectionsDataTable
                rows={connections ?? []}
                loading={isLoading}
                onSelectionChange={setSelections}
                onDelete={(id) => {
                  handleDeleteSelections([id]);
                }}
                onEdit={(opt) => {
                  handleEdit(opt);
                }}
              />
            </Paper>
          </Flex>
        </Box>
      </FeatureLayout>
      <UnbiasedConnectionSidecar
        appId={appId}
        onSelectApp={setAppId}
        connectionId={connectionId}
        onSelectConnection={setConnectionId}
        open={showConnectionSidecar}
        onClose={handleSidecarClose}
      />
    </>
  );
};
