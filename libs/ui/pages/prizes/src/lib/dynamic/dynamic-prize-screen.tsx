import { trpc } from '@worksheets/trpc-charity';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { DetailedPrizeSchema } from '@worksheets/util/types';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import { PrizeScreen } from '../components';
import { SharePrizeModal } from '../components/modals';

const PrizeScreenContainer: React.FC<{ prize: DetailedPrizeSchema }> = ({
  prize,
}) => {
  const [sharePrizeModal, setSharePrizeModal] = useState(false);

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
    <>
      <PrizeScreen
        prize={prize}
        activeRaffles={activeRaffles.data ?? []}
        expiredRaffles={expiredRaffles.data ?? []}
        suggestions={suggestedPrizes.data ?? []}
        onShare={() => setSharePrizeModal(true)}
      />
      <SharePrizeModal
        open={sharePrizeModal}
        onClose={() => setSharePrizeModal(false)}
        id={prize.id}
        name={prize.name}
      />
    </>
  );
};

export const DynamicPrizeScreen = dynamic(
  () => Promise.resolve(PrizeScreenContainer),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);
