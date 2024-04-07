import { DynamicNotifications } from '@worksheets/ui/components/notifications';

import { NotificationsPanel } from '../panels';
export const NotificationsPanelContainer = () => {
  return (
    <NotificationsPanel>
      <DynamicNotifications />
    </NotificationsPanel>
  );
};
