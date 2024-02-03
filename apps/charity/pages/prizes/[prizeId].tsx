import { createServerSideTRPC } from '@worksheets/trpc-charity/server';
import { LayoutContainer } from '@worksheets/ui/layout';
import { DynamicPrizeDetailsScreen } from '@worksheets/ui/pages/prizes';
import { PrizeSchema } from '@worksheets/util/types';
import { NextPageWithLayout } from '@worksheets/util-next';
import { GetServerSideProps } from 'next';
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

export const getServerSideProps = (async (ctx) => {
  const { params } = ctx;
  const trpc = await createServerSideTRPC(ctx);

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
}) satisfies GetServerSideProps<Props>;

export default Page;
