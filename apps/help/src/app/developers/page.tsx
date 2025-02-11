import { trpc } from '@worksheets/trpc/hydrate/server';
import { FAQPageLdJson } from '@worksheets/ui/components/seo';
import {
  developersPortalFaq,
  DevelopersPortalScreenContainer,
} from '@worksheets/ui/pages/developers-portal';
import { Boundary } from '@worksheets/ui/suspense/server';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Developers',
  description:
    'Find answers to questions about contributing games to the Charity Games Platform. Turn your games into donations.',
};

export default async function Page() {
  trpc.public.usage.contributions.prefetch();
  trpc.public.developers.list.prefetch();
  return (
    <Boundary>
      <DevelopersPortalScreenContainer />
      <FAQPageLdJson qa={developersPortalFaq} />
    </Boundary>
  );
}
