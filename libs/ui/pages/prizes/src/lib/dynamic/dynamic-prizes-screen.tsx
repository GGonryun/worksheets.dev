import { trpc } from '@worksheets/trpc-charity';
import { ErrorScreen } from '@worksheets/ui/pages/errors';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import dynamic from 'next/dynamic';

import { PrizesScreen } from '../components';

const PrizesScreenContainer = () => {
  const activePrizes = trpc.prizes.list.useQuery({
    category: 'active',
  });

  const allPrizes = trpc.prizes.list.useQuery({
    category: 'all',
    filter: activePrizes.data?.map((p) => p.id),
  });

  if (activePrizes.isLoading || allPrizes.isLoading) {
    return <LoadingScreen />;
  }

  if (activePrizes.error || allPrizes.error) {
    return <ErrorScreen />;
  }

  return (
    <PrizesScreen activePrizes={activePrizes.data} allPrizes={allPrizes.data} />
  );
};

export const DynamicPrizesScreen = dynamic(
  () => Promise.resolve(PrizesScreenContainer),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);
