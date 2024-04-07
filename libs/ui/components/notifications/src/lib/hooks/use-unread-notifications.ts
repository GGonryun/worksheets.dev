import { trpc } from '@worksheets/trpc-charity';
import { useNotificationCache } from '@worksheets/ui/hooks/use-notification-cache';
import { isPast, minutesFromNow } from '@worksheets/util/time';
import { useEffect } from 'react';

const CACHE_DURATION = 5; // minutes

export const useUnreadNotifications = (connected: boolean) => {
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
