import { NextPageWithLayout } from '@worksheets/util-next';
import { LayoutContainer } from '../../containers/layout-container';
import { ContributionScreen } from '@worksheets/ui/pages/contributions';
import { NextSeo } from 'next-seo';
import { contributeSeo } from '../../util/seo';
import { trpc } from '@worksheets/trpc-charity';

const Page: NextPageWithLayout = () => {
  const { data: statistics } = trpc.usage.contributions.useQuery();
  return (
    <>
      <NextSeo {...contributeSeo} />
      <ContributionScreen statistics={statistics} />
    </>
  );
};

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
