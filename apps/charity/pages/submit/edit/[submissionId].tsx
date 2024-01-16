import { createServerSideTRPC } from '@worksheets/trpc-charity/server';
import { NextPageWithLayout } from '@worksheets/util-next';
import { GetServerSideProps } from 'next/types';
import { NextSeo } from 'next-seo';

import { GameSubmissionScreenContainer } from '../../../containers/game-submission-screen-container';
import { DynamicLayout } from '../../../dynamic/dynamic-layout';
import { submitGameSeo } from '../../../util/seo';

type Props = {
  submissionId: string;
};

const Page: NextPageWithLayout<Props> = (props) => {
  return (
    <>
      <NextSeo {...submitGameSeo} />
      <GameSubmissionScreenContainer {...props} />
    </>
  );
};

export const getServerSideProps = (async (ctx) => {
  const { params } = ctx;

  const submissionId = params?.submissionId as string | undefined;

  if (!submissionId) {
    return {
      notFound: true,
    };
  }

  const trpc = await createServerSideTRPC(ctx);

  await trpc.user.profile.terms.get.prefetch();
  await trpc.game.submissions.get.prefetch({
    id: submissionId,
  });

  return {
    props: {
      submissionId,
      dehydratedState: trpc.dehydrate(),
    },
  };
}) satisfies GetServerSideProps<Props>;

Page.getLayout = (page) => {
  return <DynamicLayout>{page}</DynamicLayout>;
};

export default Page;
