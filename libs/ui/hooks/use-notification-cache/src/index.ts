import { useLocalStorage } from '@worksheets/ui-core';

export const useNotificationCache = () => {
  return useLocalStorage('notification-cache-v1', {
    hasUnread: false,
    expires: Date.now(),
  });
};
