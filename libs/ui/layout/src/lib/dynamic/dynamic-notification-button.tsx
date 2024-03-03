import { NotificationImportant, Notifications } from '@mui/icons-material';
import { trpc } from '@worksheets/trpc-charity';
import { useNotificationCache } from '@worksheets/ui/hooks/use-notification-cache';
import { routes } from '@worksheets/ui/routes';
import { isPast, minutesFromNow } from '@worksheets/util/time';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';

import { LoadingButton } from '../components/shared/loading-button';
import { SquareButton } from '../components/shared/square-button';

const CACHE_DURATION = 5; // minutes
const NotificationButton: React.FC<{ connected: boolean }> = ({
  connected,
}) => {
  const hasUnread = useHasUnreadNotifications(connected);

  if (!connected) return null;

  return (
    <SquareButton
      href={routes.notifications.path()}
      color={hasUnread ? 'error' : 'primary'}
    >
      {hasUnread ? (
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

const useHasUnreadNotifications = (connected: boolean) => {
  const [cache, setCache] = useNotificationCache();
  const expiredCache = isPast(cache.expires);

  const hasNotification = trpc.user.notifications.hasAny.useQuery(undefined, {
    enabled: connected && expiredCache,
  });

  useEffect(() => {
    if (hasNotification.status === 'success' && expiredCache) {
      setCache({
        hasUnread: hasNotification.data,
        expires: hasNotification.data
          ? Date.now()
          : minutesFromNow(CACHE_DURATION).getTime(),
      });
    }
  }, [expiredCache, hasNotification, setCache]);

  return cache.hasUnread;
};
