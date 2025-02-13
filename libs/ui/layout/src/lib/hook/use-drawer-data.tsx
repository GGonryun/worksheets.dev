import { trpc } from '@worksheets/trpc-charity';
import { NO_REFETCH } from '@worksheets/util/trpc';
import { useSession } from 'next-auth/react';

export const useDrawerData = () => {
  const session = useSession();
  const connected = session.status === 'authenticated';
  const loading = session.status === 'loading';

  // if the user is unauthenticated, we need to clear the cache.

  const user = trpc.user.get.useQuery(undefined, {
    enabled: connected,
    ...NO_REFETCH,
  });
  const tokens = trpc.user.inventory.quantity.useQuery('1', {
    enabled: connected,
    ...NO_REFETCH,
  });

  return {
    connected,
    loading,
    user,
    tokens,
  };
};
