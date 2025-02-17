import { trpc } from '@worksheets/trpc-charity';
import { LoadingBar } from '@worksheets/ui/components/loading';
import { ErrorScreen } from '@worksheets/ui/pages/errors';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import dynamic from 'next/dynamic';

import { DevelopersPortalScreen } from '../components';
import { developersPortalFaq } from '../data';

const DevelopersPortalScreenContainer = () => {
  const statistics = trpc.public.usage.contributions.useQuery();
  const developers = trpc.public.developers.list.useQuery();

  if (statistics.error || developers.error) return <ErrorScreen />;
  if (statistics.isPending || developers.isPending) return <LoadingScreen />;

  return (
    <DevelopersPortalScreen
      statistics={statistics.data}
      faq={developersPortalFaq}
      developers={developers.data}
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
