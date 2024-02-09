import { NotificationImportant, Notifications } from '@mui/icons-material';
import { trpc } from '@worksheets/trpc-charity';
import dynamic from 'next/dynamic';

import { LoadingButton } from '../components/shared/loading-button';
import { SquareButton } from '../components/shared/square-button';

const NotificationButton: React.FC<{ connected: boolean }> = ({
  connected,
}) => {
  const { data, error, isLoading } = trpc.user.notifications.hasAny.useQuery(
    undefined,
    {
      enabled: connected,
    }
  );

  if (!connected) return null;

  if (error) return null;

  if (isLoading) return <LoadingButton />;

  return (
    <SquareButton href={'/notifications'} color={data ? 'error' : 'primary'}>
      {data ? (
        <NotificationImportant fontSize="small" />
      ) : (
        <Notifications fontSize="small" />
      )}
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
