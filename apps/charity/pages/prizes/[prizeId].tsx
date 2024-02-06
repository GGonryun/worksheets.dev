import { createStaticTRPC } from '@worksheets/trpc-charity/server';
import { LayoutContainer } from '@worksheets/ui/layout';
import { DynamicPrizeDetailsScreen } from '@worksheets/ui/pages/prizes';
import { PrizeSchema } from '@worksheets/util/types';
import { NextPageWithLayout } from '@worksheets/util-next';
import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo, NextSeoProps } from 'next-seo';

import { prizeSeo } from '../../util/seo';

type Props = {
  seo: NextSeoProps;
  prize: PrizeSchema;
};

const Page: NextPageWithLayout<Props> = ({ seo, prize }) => (
  <>
    <NextSeo {...seo} />
    <DynamicPrizeDetailsScreen prize={prize} />
  </>
);

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export const getStaticProps = (async (ctx) => {
  const { params } = ctx;
  const trpc = await createStaticTRPC(ctx);

  const prizeId = params?.prizeId as string;

  if (!prizeId) {
    return {
      notFound: true,
    };
  }

  try {
    const prize = await trpc.prizes.find.fetch({
      prizeId,
    });

    const seo = prizeSeo(prize);

    return {
      props: {
        seo,
        prize,
      },
    };
  } catch (error) {
    console.error(`Error fetching prize ${prizeId}`, error);
    return {
      redirect: {
        destination: '/prizes',
        permanent: false,
      },
    };
  }
}) satisfies GetStaticProps<Props>;

export const getStaticPaths = (async (ctx) => {
  const trpc = await createStaticTRPC(ctx);

  const prizes = await trpc.prizes.list.fetch({ category: 'active' });

  return {
    paths: prizes.map((prize) => ({
      params: {
        prizeId: prize.id,
      },
    })),
    // generate and cache new paths on the fly, we'll optimize and pre-build all active prizes for now.
    fallback: 'blocking',
  };
}) satisfies GetStaticPaths;

export default Page;
