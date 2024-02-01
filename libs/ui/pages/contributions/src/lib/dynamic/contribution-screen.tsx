import { trpc } from '@worksheets/trpc-charity';
import { LoadingBar } from '@worksheets/ui/components/loading';
import { ErrorScreen } from '@worksheets/ui/pages/errors';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import dynamic from 'next/dynamic';

import { ContributionScreen } from '../components';
import { contributionFaq } from '../data';

const ContributionScreenContainer = () => {
  const statistics = trpc.usage.contributions.useQuery();
  const developers = trpc.developers.list.useQuery();
  if (statistics.error || developers.error) return <ErrorScreen />;

  if (statistics.isLoading || developers.isLoading) return <LoadingScreen />;

  return (
    <ContributionScreen
      statistics={statistics.data}
      faq={contributionFaq}
      developers={developers.data}
    />
  );
};

export const DynamicContributionScreen = dynamic(
  () => Promise.resolve(ContributionScreenContainer),
  {
    ssr: false,
    loading: () => <LoadingBar />,
  }
);
