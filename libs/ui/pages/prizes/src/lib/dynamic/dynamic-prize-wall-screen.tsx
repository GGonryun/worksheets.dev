import { trpc } from '@worksheets/trpc-charity';
import { LoadingBar } from '@worksheets/ui/components/loading';
import { PrizeCategory } from '@worksheets/util/types';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import { PrizeWallScreen, RaffleScreenContextProvider } from '../components';

const PrizeWallContainer = () => {
  const [category, setCategory] = useState<PrizeCategory>('all');

  const { data: hottestPrizes } = trpc.prizes.list.useQuery({
    category: 'hottest',
  });

  const { data: listPrizes } = trpc.prizes.list.useQuery({
    category: category,
  });

  return (
    <RaffleScreenContextProvider
      value={{
        hottest: hottestPrizes ?? [],
        list: listPrizes ?? [],
        category,
        setCategory,
      }}
    >
      <PrizeWallScreen />
    </RaffleScreenContextProvider>
  );
};

export const DynamicPrizeWallScreen = dynamic(
  () => Promise.resolve(PrizeWallContainer),
  {
    ssr: false,
    loading: () => <LoadingBar />,
  }
);
