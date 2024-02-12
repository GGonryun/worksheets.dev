import { createStaticTRPC } from '@worksheets/trpc-charity/server';
import { LayoutContainer } from '@worksheets/ui/layout';
import { DynamicRaffleScreen } from '@worksheets/ui/pages/raffles';
import { RaffleSchema } from '@worksheets/util/types';
import { NextPageWithLayout } from '@worksheets/util-next';
import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo, NextSeoProps } from 'next-seo';
import { ParsedUrlQuery } from 'querystring';

import { raffleSeo } from '../../util/seo';

type Props = {
  seo: NextSeoProps;
  raffle: RaffleSchema;
};

const Page: NextPageWithLayout<Props> = ({ seo, raffle }) => (
  <>
    <NextSeo {...seo} />
    <DynamicRaffleScreen raffle={raffle} />
  </>
);

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export const getStaticProps = (async (ctx) => {
  const { params } = ctx;
  const trpc = await createStaticTRPC(ctx);

  const raffleId = params?.raffleId as string;

  if (!raffleId) {
    return {
      notFound: true,
    };
  }

  try {
    const raffle = await trpc.raffles.find.fetch({
      raffleId: Number(raffleId),
    });

    const seo = raffleSeo(raffle);

    return {
      props: {
        seo,
        raffle,
      },
    };
  } catch (error) {
    console.error(`Error fetching raffle ${raffleId}`, error);
    return {
      redirect: {
        destination: '/raffles',
        permanent: false,
      },
    };
  }
}) satisfies GetStaticProps<Props>;

type PathProps = ParsedUrlQuery & {
  raffleId: string;
};

export const getStaticPaths = (async (ctx) => {
  const trpc = await createStaticTRPC(ctx);

  const raffles = await trpc.raffles.list.fetch({ category: 'active' });

  return {
    paths: raffles.map((raffle) => ({
      params: {
        raffleId: raffle.id.toString(),
      },
    })),
    // generate and cache new paths on the fly, we'll optimize and pre-build all active prizes for now.
    fallback: 'blocking',
  };
}) satisfies GetStaticPaths<PathProps>;

export default Page;
