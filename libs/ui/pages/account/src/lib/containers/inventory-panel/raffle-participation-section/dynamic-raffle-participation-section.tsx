import { trpc } from '@worksheets/trpc-charity';
import { LoadingBar } from '@worksheets/ui/components/loading';
import dynamic from 'next/dynamic';

import { ParticipationSection } from './participation-section';

const Container = () => {
  const enteredRaffles = trpc.user.raffles.entered.useQuery({
    activeOnly: false,
  });

  return <ParticipationSection raffles={enteredRaffles.data ?? []} />;
};

export const DynamicRaffleParticipationSection = dynamic(
  () => Promise.resolve(Container),
  {
    ssr: false,
    loading: () => <LoadingBar />,
  }
);
