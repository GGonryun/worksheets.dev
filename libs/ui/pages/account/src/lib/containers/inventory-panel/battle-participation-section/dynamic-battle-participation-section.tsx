import { BattleStatus } from '@prisma/client';
import { trpc } from '@worksheets/trpc-charity';
import { LoadingBar } from '@worksheets/ui/components/loading';
import dynamic from 'next/dynamic';

import { ParticipationSection } from './participation-section';

const Container = () => {
  const participation = trpc.user.battles.participation.useQuery({
    status: [BattleStatus.ACTIVE, BattleStatus.COMPLETE],
  });

  return <ParticipationSection battles={participation.data ?? []} />;
};

export const DynamicBattleParticipationSection = dynamic(
  () => Promise.resolve(Container),
  {
    ssr: false,
    loading: () => <LoadingBar />,
  }
);
