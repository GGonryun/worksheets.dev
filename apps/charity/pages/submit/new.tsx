import { createServerSideTRPC } from '@worksheets/trpc-charity/server';
import { DynamicLayout } from '@worksheets/ui/layout';
import { DynamicCreateGameSubmissionScreen } from '@worksheets/ui/pages/game-submissions';
import { NextPageWithLayout } from '@worksheets/util-next';
import { GetServerSideProps } from 'next/types';
import { NextSeo } from 'next-seo';

import { createGameSubmissionSeo } from '../../util/seo';

const Page: NextPageWithLayout = () => (
  <>
    <NextSeo {...createGameSubmissionSeo} />
    <DynamicCreateGameSubmissionScreen />
  </>
);

export const getServerSideProps = (async (ctx) => {
  const trpc = await createServerSideTRPC(ctx);

  const profile = await trpc.user.get.fetch();

  if (!profile) {
    return {
      redirect: {
        destination: '/account',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}) satisfies GetServerSideProps;

Page.getLayout = (page) => {
  return <DynamicLayout>{page}</DynamicLayout>;
};

export default Page;
