import { trpc } from '@worksheets/trpc-charity';
import { LoadingBar } from '@worksheets/ui/components/loading';
import { FilterableRaffleCategory } from '@worksheets/util/types';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { RafflesScreen } from '../components';

const RafflesContainer = () => {
  const router = useRouter();

  const session = useSession();
  const isConnected = session.status === 'authenticated';

  const [category, setCategory] =
    useState<FilterableRaffleCategory>('expiring');
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    const search = router.query.search as string | undefined;

    if (search) {
      setQuery(search);
    }
  }, [router.query.search]);

  const { data: hottestPrizes } = trpc.raffles.list.useQuery({
    category: 'hottest',
    limit: 7,
  });

  const { data: listPrizes } = trpc.raffles.list.useQuery({
    category,
  });

  const { data: enteredRaffles } = trpc.user.raffles.entered.useQuery(
    {
      filter: 'ACTIVE',
    },
    {
      enabled: isConnected,
    }
  );

  const { data: searchPrizes } = trpc.raffles.list.useQuery({
    category: 'active',
    query,
  });

  return (
    <RafflesScreen
      hottest={hottestPrizes ?? []}
      entered={enteredRaffles ?? []}
      list={listPrizes ?? []}
      category={category}
      setCategory={setCategory}
      searched={searchPrizes ?? []}
      query={query}
      setQuery={setQuery}
    />
  );
};

export const DynamicRafflesScreen = dynamic(
  () => Promise.resolve(RafflesContainer),
  {
    ssr: false,
    loading: () => <LoadingBar />,
  }
);
