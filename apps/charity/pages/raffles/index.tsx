import { createStaticTRPC } from '@worksheets/trpc-charity/server';
import { AppLayoutContainer } from '@worksheets/ui/layout';
import { DynamicRafflesScreen } from '@worksheets/ui/pages/raffles';
import { RaffleSchema } from '@worksheets/util/types';
import { NextPageWithLayout } from '@worksheets/util-next';
import { GetStaticProps } from 'next';
import { NextSeo, NextSeoProps } from 'next-seo';

import { rafflesSeo } from '../../util/seo';

type Props = {
  seo: NextSeoProps;
  all: RaffleSchema[];
};

const Page: NextPageWithLayout<Props> = ({ seo, ...props }) => (
  <>
    <NextSeo {...seo} />
    <DynamicRafflesScreen {...props} />
  </>
);

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

// Because raffles are generated statically, we should always put them
// into a pending state and deploy new pages before they are live.
export const getStaticProps = (async (ctx) => {
  try {
    const trpc = await createStaticTRPC(ctx);

    const all = await trpc.public.raffles.list.fetch({
      category: 'all',
    });

    return {
      props: {
        seo: rafflesSeo,
        all,
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
