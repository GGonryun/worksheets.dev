import { trpc } from '@worksheets/trpc-charity';
import { ErrorScreen } from '@worksheets/ui/pages/errors';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import dynamic from 'next/dynamic';

import { ExpiredRafflesScreen } from '../components/expired-raffles-screen';

const ExpiredRafflesScreenContainer = () => {
  const {
    data: expiredPrizes,
    isPending,
    error,
  } = trpc.public.raffles.list.useQuery({
    category: 'expired',
  });

  if (isPending) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen />;
  }

  return <ExpiredRafflesScreen raffles={expiredPrizes ?? []} />;
};

export const DynamicExpiredRafflesScreen = dynamic(
  () => Promise.resolve(ExpiredRafflesScreenContainer),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);
