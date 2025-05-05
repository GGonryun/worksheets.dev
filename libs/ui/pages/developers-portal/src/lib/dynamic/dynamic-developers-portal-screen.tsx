import { trpc } from '@worksheets/trpc-charity';
import { LoadingBar } from '@worksheets/ui/components/loading';
import { ErrorScreen } from '@worksheets/ui/pages/errors';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import dynamic from 'next/dynamic';

import { DevelopersPortalScreen } from '../components';
import { developersPortalFaq } from '../data';

const DevelopersPortalScreenContainer = () => {
  const statistics = trpc.public.usage.contributions.useQuery();
  const teams = trpc.public.teams.list.useQuery();

  if (statistics.error || teams.error) return <ErrorScreen />;
  if (statistics.isPending || teams.isPending) return <LoadingScreen />;

  return (
    <DevelopersPortalScreen
      statistics={statistics.data}
      faq={developersPortalFaq}
      teams={teams.data}
    />
  );
};

export const DynamicDevelopersPortalScreen = dynamic(
  () => Promise.resolve(DevelopersPortalScreenContainer),
  {
    ssr: false,
    loading: () => <LoadingBar />,
  }
);
