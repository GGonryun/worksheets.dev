import { ApplicationInformation } from './application-information';
import { SidecarTitle } from './sidecar-title';
import { ConnectionForm } from './connection-form';
import { Footer } from './footer';
import { trpc } from '@worksheets/trpc/ide';
import { Box, Divider } from '@mui/material';
import { FC, useState } from 'react';
import { GetConnectionDetailsResponse } from '@worksheets/schemas-connections';
import { waitFor } from '@worksheets/util/time';
import { ApplicationSelectionForm } from './application-selection-form';
import { useLayout } from '@worksheets/ui/common';
import { TinySidecar } from '@worksheets/ui-basic-style';

export const UnbiasedConnectionSidecar: React.FC<{
  appId?: string;
  connectionId?: string;
  onClose: () => void;
  onSelectApp: (appId: string) => void;
  onSelectConnection: (connectionId: string) => void;
  open: boolean;
}> = ({
  appId,
  connectionId,
  open,
  onClose,
  onSelectConnection,
  onSelectApp,
}) => {
  const utils = trpc.useContext();
  const { isMobile } = useLayout();

  const [loading, setLoading] = useState(false);

  // TODO: this request also reloads a lot of the sidecars content leading to a jarring refresh experience.
  // looks fine on oauth but not as good on regular fields.
  const { data: details } = trpc.connections.getDetails.useQuery(
    {
      appId: appId ?? '',
      connectionId: connectionId ?? '',
    },
    { enabled: !!appId && open }
  );

  const { data: applications } = trpc.applications.list.useQuery({
    gallery: true,
    featured: true,
    features: ['connections'],
  });

  return (
    <TinySidecar
      open={open}
      width={isMobile ? 'calc(100% - 58px)' : '600px'}
      onClose={onClose}
      loading={loading}
    >
      {!details && (
        <ApplicationSelectionForm
          applications={applications ?? []}
          onSelectApp={async (appId) => {
            setLoading(true);
            onSelectApp(appId);
            await waitFor(2000);
            setLoading(false);
          }}
          onClose={onClose}
        />
      )}

      {details && (
        <SidecarContent
          details={details}
          onConnect={async (connectionId) => {
            setLoading(true);
            onSelectConnection(connectionId);
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
    </TinySidecar>
  );
};

const SidecarContent: FC<{
  details: GetConnectionDetailsResponse;
  onClose: () => void;
  onConnect: (connectionId: string) => void;
}> = ({ details, onClose, onConnect }) => (
  <Box>
    <Box px={3} py={1}>
      <SidecarTitle details={details} onClose={() => onClose()} />
    </Box>
    <Divider />
    <Box px={3} py={2}>
      <ApplicationInformation connection={details} />
    </Box>
    <Divider />
    <ConnectionForm onConnect={onConnect} details={details} onClose={onClose} />
    <Divider />

    <Box px={3} py={2}>
      <Footer details={details} onUninstall={onClose} />
    </Box>
    <Divider />
  </Box>
);
