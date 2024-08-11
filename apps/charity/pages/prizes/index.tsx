import { AppLayoutContainer } from '@worksheets/ui/layout';
import { DynamicPrizesPage } from '@worksheets/ui/pages/prizes';
import { NextPageWithLayout } from '@worksheets/util-next';
import { GetStaticProps } from 'next';
import { NextSeo, NextSeoProps } from 'next-seo';

import { prizesSeo } from '../../util/seo';

type Props = {
  seo: NextSeoProps;
};

const Page: NextPageWithLayout<Props> = ({ seo }) => (
  <>
    <NextSeo {...seo} />
    <DynamicPrizesPage />
  </>
);

export const getStaticProps = (async () => ({
  props: { seo: prizesSeo },
})) satisfies GetStaticProps<Props>;

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
