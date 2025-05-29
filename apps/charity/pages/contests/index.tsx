import { AppLayoutContainer } from '@worksheets/ui/layout';
import { DynamicContestsScreen } from '@worksheets/ui/pages/contests';
import { NextPageWithLayout } from '@worksheets/util-next';
import { GetStaticProps } from 'next';
import { NextSeo, NextSeoProps } from 'next-seo';

import { contestsSeo } from '../../util/seo';
type Props = {
  seo: NextSeoProps;
};

const Page: NextPageWithLayout<Props> = ({ seo }) => (
  <>
    <NextSeo {...seo} />
    <DynamicContestsScreen />
  </>
);

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

// Because raffles are generated statically, we should always put them
// into a pending state and deploy new pages before they are live.
export const getStaticProps = (async () => {
  try {
    return {
      props: {
        seo: contestsSeo,
      },
    };
  } catch (error) {
    console.error(`Failed to load raffles`, error);
    return {
      notFound: true,
    };
  }
}) satisfies GetStaticProps<Props>;

export default Page;
