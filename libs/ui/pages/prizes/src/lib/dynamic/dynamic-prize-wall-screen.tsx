import { trpc } from '@worksheets/trpc-charity';
import { LoadingBar } from '@worksheets/ui/components/loading';
import { PrizeCategory } from '@worksheets/util/types';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import { PrizeWallScreen } from '../components';

const PrizeWallContainer = () => {
  const [category, setCategory] = useState<PrizeCategory>('all');
  const [search, setSearch] = useState<string>('');

  const { data: hottestPrizes } = trpc.prizes.list.useQuery({
    category: 'hottest',
  });

  const { data: listPrizes } = trpc.prizes.list.useQuery({
    category,
  });

  const { data: enteredRaffles } = trpc.prizes.list.useQuery({
    category: 'entered',
  });

  const { data: searchPrizes } = trpc.prizes.list.useQuery({
    category: 'all',
    search,
  });

  return (
    <PrizeWallScreen
      hottest={hottestPrizes ?? []}
      entered={enteredRaffles ?? []}
      list={listPrizes ?? []}
      category={'all'}
      setCategory={setCategory}
      searched={searchPrizes ?? []}
      search={search}
      setSearch={setSearch}
    />
  );
};

export const DynamicPrizeWallScreen = dynamic(
  () => Promise.resolve(PrizeWallContainer),
  {
    ssr: false,
    loading: () => <LoadingBar />,
  }
);
