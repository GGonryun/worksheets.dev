import { trpc } from '@worksheets/trpc-charity';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { DetailedPrizeSchema } from '@worksheets/util/types';
import dynamic from 'next/dynamic';

import { PrizeScreen } from '../components';

const PrizeScreenContainer: React.FC<{ prize: DetailedPrizeSchema }> = ({
  prize,
}) => {
  const activeRaffles = trpc.raffles.list.useQuery({
    prizeId: prize.id,
    category: 'active',
  });

  const expiredRaffles = trpc.raffles.list.useQuery({
    prizeId: prize.id,
    category: 'expired',
  });

  const suggestedPrizes = trpc.prizes.suggestions.useQuery({
    prizeId: prize.id,
  });

  return (
    <PrizeScreen
      prize={prize}
      activeRaffles={activeRaffles.data ?? []}
      expiredRaffles={expiredRaffles.data ?? []}
      suggestions={suggestedPrizes.data ?? []}
      onShare={() => alert('TODO')}
    />
  );
};

export const DynamicPrizeScreen = dynamic(
  () => Promise.resolve(PrizeScreenContainer),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);
