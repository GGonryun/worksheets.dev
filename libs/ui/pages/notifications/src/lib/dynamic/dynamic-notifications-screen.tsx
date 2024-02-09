import { trpc } from '@worksheets/trpc-charity';
import { Snackbar, useSnackbar } from '@worksheets/ui/components/snackbar';
import { ErrorScreen } from '@worksheets/ui/pages/errors';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { FilterableNotificationType } from '@worksheets/util/types';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import { NotificationsScreen } from '../components/notifications-screen';

const NotificationsScreenContainer = () => {
  const snackbar = useSnackbar();

  const [filter, setFilter] = useState<FilterableNotificationType>('ALL');

  const notifications = trpc.user.notifications.list.useQuery({
    filter,
    readOnLoad: true,
    limit: 100,
  });

  const clearNotifications = trpc.user.notifications.clear.useMutation();

  const handleClear = async () => {
    await clearNotifications.mutateAsync({
      ids: notifications.data?.map((n) => n.id) ?? [],
    });

    snackbar.trigger({
      message: 'All notifications cleared',
      severity: 'success',
    });
  };

  if (notifications.error) {
    return <ErrorScreen />;
  }

  return (
    <>
      <NotificationsScreen
        loading={notifications.isLoading}
        notifications={notifications.data ?? []}
        onClear={handleClear}
        activeFilter={filter}
        onChangeFilter={setFilter}
      />
      <Snackbar {...snackbar.props} />
    </>
  );
};

export const DynamicNotificationsScreen = dynamic(
  () => Promise.resolve(NotificationsScreenContainer),
  { ssr: false, loading: () => <LoadingScreen /> }
);
