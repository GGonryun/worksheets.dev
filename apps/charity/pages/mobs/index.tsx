import { AppLayoutContainer } from '@worksheets/ui/layout';
import { DynamicMobsScreen } from '@worksheets/ui/pages/mobs';
import { NextPageWithLayout } from '@worksheets/util-next';
import { NextSeo, NextSeoProps } from 'next-seo';

type Props = {
  seo: NextSeoProps;
};

const Page: NextPageWithLayout<Props> = ({ seo }) => (
  <>
    <NextSeo {...seo} />
    <DynamicMobsScreen />
  </>
);

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
