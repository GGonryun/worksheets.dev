import { createServerSideTRPC } from '@worksheets/trpc-charity/server';
import { DynamicLayout } from '@worksheets/ui/layout';
import { DynamicArcadeScreen } from '@worksheets/ui/pages/arcade';
import { NextPageWithLayout } from '@worksheets/util-next';
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';

import { gamesSeo } from '../../util/seo';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo {...gamesSeo} />
      <DynamicArcadeScreen />
    </>
  );
};

export const getServerSideProps = (async (ctx) => {
  const trpc = await createServerSideTRPC(ctx);

  await trpc.arcade.details.prefetch();

  return {
    props: {
      dehydratedState: trpc.dehydrate(),
    },
  };
}) satisfies GetServerSideProps;

Page.getLayout = (page) => {
  return <DynamicLayout>{page}</DynamicLayout>;
};

export default Page;
