import { routes } from '@worksheets/routes';
import { createStaticTRPC } from '@worksheets/trpc-charity/server';
import { AppLayoutContainer } from '@worksheets/ui/layout';
import { DynamicPrizeScreen } from '@worksheets/ui/pages/prizes';
import { DetailedPrizeSchema } from '@worksheets/util/types';
import { NextPageWithLayout } from '@worksheets/util-next';
import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo, NextSeoProps } from 'next-seo';

import { prizeSeo } from '../../util/seo';

type Props = {
  seo: NextSeoProps;
  prize: DetailedPrizeSchema;
};

const Page: NextPageWithLayout<Props> = ({ seo, prize }) => (
  <>
    <NextSeo {...seo} />
    <DynamicPrizeScreen prize={prize} />
  </>
);

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
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
    const prize = await trpc.public.prizes.find.fetch({
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
        destination: routes.prizes.path(),
        permanent: false,
      },
    };
  }
}) satisfies GetStaticProps<Props>;

export const getStaticPaths = (async (ctx) => {
  const trpc = await createStaticTRPC(ctx);

  const prizes = await trpc.public.prizes.list.fetch({ category: 'active' });

  return {
    paths: prizes.map((prize) => ({
      params: {
        prizeId: prize.id.toString(),
      },
    })),
    // generate and cache new paths on the fly, we'll optimize and pre-build all active prizes for now.
    fallback: 'blocking',
  };
}) satisfies GetStaticPaths;

export default Page;
