import { AppLayoutContainer } from '@worksheets/ui/layout';
import { DynamicRafflesScreen } from '@worksheets/ui/pages/raffles';
import { NextPageWithLayout } from '@worksheets/util-next';
import { GetStaticProps } from 'next';
import { NextSeo, NextSeoProps } from 'next-seo';

import { rafflesSeo } from '../../util/seo';

type Props = {
  seo: NextSeoProps;
};

const Page: NextPageWithLayout<Props> = ({ seo, ...props }) => (
  <>
    <NextSeo {...seo} />
    <DynamicRafflesScreen />
  </>
);

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

// Because raffles are generated statically, we should always put them
// into a pending state and deploy new pages before they are live.
export const getStaticProps = (async (ctx) => {
  try {
    return {
      props: {
        seo: rafflesSeo,
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
