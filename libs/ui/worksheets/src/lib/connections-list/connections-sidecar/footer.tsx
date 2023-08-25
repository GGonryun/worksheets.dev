import { Box } from '@mui/material';
import { SupportBox } from './support-box';
import { DisconnectBox } from './disconnect-box';
import {
  ConnectionStatuses,
  GetConnectionDetailsResponse,
} from '@worksheets/schemas-connections';
import { trpc } from '@worksheets/trpc/ide';

const buttonTooltip: Record<ConnectionStatuses, string> = {
  active: '',
  disabled: '',
  error: '',
  warning: '',
  pending:
    'Save your connection first. You can delete it after it has been saved.',
  unknown: 'We were unable to detect the state of this app',
};

export const Footer: React.FC<{
  onUninstall: () => void;
  details: GetConnectionDetailsResponse;
}> = ({ details, onUninstall }) => {
  const utils = trpc.useContext();
  const uninstallConnection = trpc.connections.delete.useMutation();

  const handleUninstall = async () => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm('Are you sure you want to delete your connection?')) return;

    await uninstallConnection.mutateAsync({ connectionIds: [details.id] });
    await utils.connections.getPage.invalidate();
    onUninstall();
  };

  return (
    <Box py={3} display="flex" gap={3} justifyContent="flex-end">
      <SupportBox />
      <DisconnectBox
        tooltip={buttonTooltip[details.credentials.status]}
        disabled={!details.id}
        onUninstall={handleUninstall}
      />
    </Box>
  );
};
