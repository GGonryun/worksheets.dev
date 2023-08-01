import { Box } from '@mui/material';
import { SupportBox } from './support-box';
import { DisconnectBox } from './disconnect-box';
import {
  ConnectionStatuses,
  GetConnectionDetailsResponse,
} from '@worksheets/schemas-connections';
import { isConnected } from '../state-maps';
import { trpc } from '@worksheets/trpc/ide';
import { useRouter } from 'next/router';

const buttonTooltip: Record<ConnectionStatuses, string> = {
  active: '',
  disabled: '',
  error: '',
  warning: '',
  uninstalled: 'This app is not installed',
  unknown: 'We were unable to detect the state of this app',
};

export const Footer: React.FC<{ details: GetConnectionDetailsResponse }> = ({
  details,
}) => {
  const { push } = useRouter();
  const utils = trpc.useContext();
  const uninstallConnection =
    trpc.connections.deleteByApplication.useMutation();

  const handleUninstall = async () => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm('Are you sure you want to delete your connection?')) return;
    push('/connections');
    utils.connections.getDetails.invalidate({ appId: details.appId });
    utils.connections.getPage.invalidate();
    uninstallConnection.mutateAsync({ appId: details.appId });
  };

  return (
    <Box py={3} display="flex" gap={3} justifyContent="flex-end">
      <SupportBox />
      <DisconnectBox
        tooltip={buttonTooltip[details.form.status]}
        disabled={!isConnected[details.form.status]}
        onUninstall={handleUninstall}
      />
    </Box>
  );
};
