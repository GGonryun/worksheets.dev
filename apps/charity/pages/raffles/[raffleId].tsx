import { createStaticTRPC } from '@worksheets/trpc-charity/server';
import { AppLayoutContainer } from '@worksheets/ui/layout';
import { DynamicRaffleScreen } from '@worksheets/ui/pages/raffles';
import { RaffleSchema } from '@worksheets/util/types';
import { NextPageWithLayout } from '@worksheets/util-next';
import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo, NextSeoProps } from 'next-seo';

import { raffleSeo } from '../../util/seo';

type Props = {
  seo: NextSeoProps;
  raffle: RaffleSchema;
};

const Page: NextPageWithLayout<Props> = ({ seo, raffle }) => {
  return (
    <>
      <NextSeo {...seo} />
      {/* TODO: split up the raffle so that static data can be cached for long periods of time. */}
      <DynamicRaffleScreen raffle={raffle} />
    </>
  );
};

// Because raffles are generated statically, we should always put them
// into a pending state and deploy new pages before they are live.
export const getStaticProps = (async (ctx) => {
  try {
    const { params } = ctx;

    const trpc = await createStaticTRPC(ctx);

    const raffleId = Number(params?.raffleId);

    // TODO: fix the find method to accept just a number
    const raffle = await trpc.public.raffles.find.fetch({ raffleId });

    const seo = raffleSeo(raffle);

    return {
      props: {
        seo,
        raffle,
      },
    };
  } catch (error) {
    console.error(`Failed to load monster `, error);
    return {
      notFound: true,
    };
  }
}) satisfies GetStaticProps<Props>;

export const getStaticPaths = (async (ctx) => {
  const trpc = await createStaticTRPC(ctx);

  const raffles = await trpc.public.raffles.list.fetch({ category: 'all' });

  return {
    paths: raffles.map((raffle) => ({
      params: {
        raffleId: raffle.id.toString(),
      },
    })),
    fallback: 'blocking',
  };
}) satisfies GetStaticPaths<{ raffleId: string }>;

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
