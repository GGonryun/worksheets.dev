import { AppLayoutContainer } from '@worksheets/ui/layout';
import { DynamicBattlesScreen } from '@worksheets/ui/pages/battles';
import { NextPageWithLayout } from '@worksheets/util-next';
import { GetStaticProps } from 'next';
import { NextSeo, NextSeoProps } from 'next-seo';

import { bossBattlesSeo } from '../../util/seo';

type Props = {
  seo: NextSeoProps;
};

const Page: NextPageWithLayout<Props> = ({ seo }) => (
  <>
    <NextSeo {...seo} />
    <DynamicBattlesScreen />
  </>
);

export const getStaticProps = (async () => ({
  props: { seo: bossBattlesSeo },
})) satisfies GetStaticProps<Props>;

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
