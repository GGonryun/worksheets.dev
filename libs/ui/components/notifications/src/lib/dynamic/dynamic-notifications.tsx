import { trpc } from '@worksheets/trpc-charity';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import { ErrorScreen } from '@worksheets/ui/pages/errors';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { FilterableNotificationType } from '@worksheets/util/types';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import { Notifications } from '../components/notifications';

const Container = () => {
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

    await notifications.refetch();

    snackbar.success('All notifications cleared');
  };

  if (notifications.error) {
    return <ErrorScreen />;
  }

  return (
    <Notifications
      loading={notifications.isLoading}
      notifications={notifications.data ?? []}
      onClear={handleClear}
      activeFilter={filter}
      onChangeFilter={setFilter}
    />
  );
};

export const DynamicNotifications = dynamic(() => Promise.resolve(Container), {
  ssr: false,
  loading: () => <LoadingScreen />,
});
