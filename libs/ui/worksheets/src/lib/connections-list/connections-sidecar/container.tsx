import { SidecarLayout } from '../../shared/sidecar-layout';
import { ApplicationInformation } from './application-information';
import { SidecarTitle } from './sidecar-title';
import { ConnectionForm } from './connection-form';
import { Footer } from './footer';
import { useRouter } from 'next/router';
import { trpc } from '@worksheets/trpc/ide';
import {
  Box,
  CircularProgress,
  Divider,
  Drawer,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { GetConnectionDetailsResponse } from '@worksheets/schemas-connections';
import { waitFor } from '@worksheets/util/time';

export const ConnectionSidecar: React.FC<{
  appId?: string;
}> = ({ appId }) => {
  const { push } = useRouter();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { data: details, isLoading } = trpc.connections.getDetails.useQuery(
    {
      appId: appId ?? '',
      connectionId: '',
    },
    { enabled: !!appId }
  );

  const handleClose = () => {
    push(`/connections`);
  };

  if (!details || isLoading) return null;

  return (
    <SidecarLayout
      open={Boolean(appId)}
      width={isMobile ? 'calc(100% - 58px)' : '600px'}
      onClose={handleClose}
      title={<SidecarTitle details={details} onClose={handleClose} />}
      section1={<ApplicationInformation connection={details} />}
      section2={
        <ConnectionForm
          onConnect={() => alert('connecting')}
          details={details}
        />
      }
      section3={
        <Footer
          details={details}
          onUninstall={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
      }
    />
  );
};

export const UnbiasedConnectionSidecar: React.FC<{
  appId?: string;
  connectionId?: string;
  onClose: () => void;
  open: boolean;
}> = ({ appId, connectionId: initialConnectionId, open, onClose }) => {
  const theme = useTheme();
  const utils = trpc.useContext();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [loading, setLoading] = useState(false);
  const [connectionId, setConnectionId] = useState('');

  useEffect(() => {
    console.log('connection updated', initialConnectionId);
    setConnectionId(initialConnectionId ?? '');
  }, [initialConnectionId]);

  // TODO: this request also reloads a lot of the sidecars content leading to a jarring refresh experience.
  // looks fine on oauth but not as good on regular fields.
  const { data: details, isLoading } = trpc.connections.getDetails.useQuery(
    {
      appId: appId ?? '',
      connectionId: connectionId ?? '',
    },
    { enabled: !!appId && open }
  );

  return (
    <UnbiasedSidecarLayout
      open={open}
      width={isMobile ? 'calc(100% - 58px)' : '600px'}
      onClose={() => onClose()}
      loading={loading || isLoading || !details}
    >
      {details && (
        <SidecarContent
          details={details}
          onConnect={async (connectionId) => {
            setLoading(true);
            setConnectionId(connectionId);
            await utils.connections.getDetails.invalidate({
              appId,
              connectionId,
            });
            await waitFor(2000);
            setLoading(false);
            await utils.connections.list.invalidate({
              appId,
            });
          }}
          onClose={onClose}
        />
      )}
    </UnbiasedSidecarLayout>
  );
};

const UnbiasedSidecarLayout: React.FC<{
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: number | string;
  loading?: boolean;
}> = ({ children, open, onClose, width, loading }) => (
  <Drawer
    anchor="right"
    open={open}
    onClose={onClose}
    sx={{
      '& .MuiDrawer-paper': {
        width: width,
        maxWidth: width,
        minWidth: width,
        padding: 0,
      },
    }}
  >
    {loading ? (
      <Box
        height="100%"
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress size={72} />
      </Box>
    ) : (
      children
    )}
  </Drawer>
);

const SidecarContent: FC<{
  details: GetConnectionDetailsResponse;
  onClose: () => void;
  onConnect: (connectionId: string) => void;
}> = ({ details, onClose, onConnect }) => (
  <Box mt={'64px'}>
    <Box px={3} py={1}>
      <SidecarTitle details={details} onClose={() => onClose()} />
    </Box>
    <Divider />
    <Box px={3} py={2}>
      <ApplicationInformation connection={details} />
    </Box>
    <Divider />
    <ConnectionForm onConnect={onConnect} details={details} />
    <Divider />

    <Box px={3} py={2}>
      <Footer details={details} onUninstall={onClose} />
    </Box>
    <Divider />
  </Box>
);
