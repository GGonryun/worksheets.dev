import { trpc } from '@worksheets/trpc-charity';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { RaffleSchema } from '@worksheets/util/types';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';

import { RafflesScreen } from '../components';

const RafflesContainer: React.FC<{
  all: RaffleSchema[];
}> = ({ all }) => {
  const session = useSession();
  const isConnected = session.status === 'authenticated';

  const entered = trpc.user.raffles.entered.useQuery(
    { activeOnly: true },
    {
      enabled: isConnected,
    }
  );

  return <RafflesScreen entered={entered.data ?? []} list={all ?? []} />;
};

export const DynamicRafflesScreen = dynamic(
  () => Promise.resolve(RafflesContainer),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);
