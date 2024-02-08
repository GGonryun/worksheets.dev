import { trpc } from '@worksheets/trpc-charity';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import dynamic from 'next/dynamic';

import { PrizesScreen } from '../components';

const PrizesScreenContainer = () => {
  const prizes = trpc.prizes.list.useQuery({
    category: 'active',
  });
  if (prizes.status === 'loading') {
    return <LoadingScreen />;
  }

  if (prizes.status === 'error') {
    return <div>Error: {prizes.error.message}</div>;
  }

  return <PrizesScreen prizes={prizes.data} />;
};

export const DynamicPrizesScreen = dynamic(
  () => Promise.resolve(PrizesScreenContainer),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);
