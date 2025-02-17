import { trpc } from '@worksheets/trpc-charity';
import { ErrorScreen } from '@worksheets/ui/pages/errors';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';

import { RafflesScreen } from '../components';

const RafflesContainer: React.FC = () => {
  const session = useSession();
  const isConnected = session.status === 'authenticated';

  const entered = trpc.user.raffles.entered.useQuery(
    { activeOnly: true },
    {
      enabled: isConnected,
    }
  );

  const list = trpc.public.raffles.list.useQuery({
    category: 'not-expired',
  });

  if (list.isPending) return <LoadingScreen />;
  if (list.isError) return <ErrorScreen />;

  return <RafflesScreen entered={entered.data ?? []} list={list.data ?? []} />;
};

export const DynamicRafflesScreen = dynamic(
  () => Promise.resolve(RafflesContainer),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);
