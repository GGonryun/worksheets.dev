'use client';

import { trpc } from '@worksheets/trpc-charity';

import { DevelopersPortalScreen } from '../components';
import { developersPortalFaq } from '../data/developers-portal-faq';

export const DevelopersPortalScreenContainer = () => {
  const [statistics] = trpc.public.usage.contributions.useSuspenseQuery();
  const [developers] = trpc.public.developers.list.useSuspenseQuery();

  return (
    <DevelopersPortalScreen
      statistics={statistics}
      faq={developersPortalFaq}
      developers={developers}
    />
  );
};
