import { Notifications } from '@mui/icons-material';
import { routes } from '@worksheets/ui/routes';
import dynamic from 'next/dynamic';

import { LoadingButton } from '../components/shared/loading-button';
import { SquareButton } from '../components/shared/square-button';

const NotificationButton: React.FC<{ connected: boolean }> = ({
  connected,
}) => {
  if (!connected) return null;

  // TODO: show the number of unread notifications
  return (
    <SquareButton href={routes.notifications.path()} color={'primary'}>
      <Notifications fontSize="small" />
    </SquareButton>
  );
};

export const DynamicNotificationButton = dynamic(
  () => Promise.resolve(NotificationButton),
  {
    ssr: false,
    loading: () => <LoadingButton />,
  }
);
