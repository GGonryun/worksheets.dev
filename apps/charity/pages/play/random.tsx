import { createServerSideTRPC } from '@worksheets/trpc-charity/server';
import { DynamicLayout } from '@worksheets/ui/layout';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { NextPageWithLayout } from '@worksheets/util-next';
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo noindex />
      <LoadingScreen />
    </>
  );
};

export const getServerSideProps = (async (ctx) => {
  const trpc = await createServerSideTRPC(ctx);

  const randomGame = await trpc.game.findRandom.fetch();

  return {
    redirect: {
      destination: `/play/${randomGame.id}`,
      permanent: false,
    },
  };
}) satisfies GetServerSideProps;

Page.getLayout = (page) => {
  return <DynamicLayout>{page}</DynamicLayout>;
};

export default Page;
