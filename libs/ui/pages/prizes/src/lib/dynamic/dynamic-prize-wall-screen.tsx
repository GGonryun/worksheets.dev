import { trpc } from '@worksheets/trpc-charity';
import { LoadingBar } from '@worksheets/ui/components/loading';
import { PrizeCategory } from '@worksheets/util/types';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import { PrizeWallScreen } from '../components';

const PrizeWallContainer = () => {
  const session = useSession();
  const isConnected = session.status === 'authenticated';

  const [category, setCategory] = useState<PrizeCategory>('all');
  const [search, setSearch] = useState<string>('');

  const { data: hottestPrizes } = trpc.prizes.list.useQuery({
    category: 'hottest',
  });

  const { data: listPrizes } = trpc.prizes.list.useQuery({
    category,
  });

  const { data: enteredRaffles } = trpc.user.prizes.entered.useQuery(
    {
      filter: 'active',
    },
    {
      enabled: isConnected,
    }
  );

  const { data: searchPrizes } = trpc.prizes.list.useQuery({
    category: 'active',
    search,
  });

  return (
    <PrizeWallScreen
      hottest={hottestPrizes ?? []}
      entered={enteredRaffles ?? []}
      list={listPrizes ?? []}
      category={'active'}
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
