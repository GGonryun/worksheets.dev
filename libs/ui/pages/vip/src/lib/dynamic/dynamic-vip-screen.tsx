import { trpc } from '@worksheets/trpc-charity';
import { ErrorScreen } from '@worksheets/ui/pages/errors';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';

import { VIPScreen } from '../components/vip-screen';

const VIPScreenContainer = () => {
  const session = useSession();
  const isConnected = session.status === 'authenticated';
  const waitlisted = trpc.user.vip.waitlist.get.useQuery(undefined, {
    enabled: isConnected,
  });
  const join = trpc.user.vip.waitlist.join.useMutation();

  const handleJoin = async () => {
    if (!isConnected) {
      return;
    }

    await join.mutateAsync();
  };

  if (waitlisted.isLoading) {
    return <LoadingScreen />;
  }

  if (waitlisted.error) {
    return <ErrorScreen />;
  }

  return <VIPScreen waitlisted={waitlisted.data ?? false} join={handleJoin} />;
};

export const DynamicVIPScreen = dynamic(
  () => Promise.resolve(VIPScreenContainer),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);
