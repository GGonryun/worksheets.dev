import { NextPageWithLayout } from '@worksheets/util-next';
import { GameSubmissionScreenContainer } from '../../../containers/game-submission-screen-container';
import { LayoutContainer } from '../../../containers/layout-container';
import { submitGameSeo } from '../../../util/seo';
import { NextSeo } from 'next-seo';
import { GetServerSideProps } from 'next/types';
import { createServerSideTRPC } from '@worksheets/trpc-charity/server';
import { GameSubmissionForm } from '@worksheets/ui/pages/game-submissions';
import { Nullable } from '@worksheets/util/types';

type Props = {
  submissionId: string;
  form: Nullable<GameSubmissionForm>;
  invalidProfile: boolean;
};

const Page: NextPageWithLayout<Props> = (props) => {
  // TODO: implement this page
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

  const terms = await trpc.profile.terms.get.fetch();

  try {
    const form = await trpc.game.submissions.get.fetch({
      id: submissionId,
    });

    return {
      props: {
        submissionId,
        form,
        invalidProfile: !terms.hasApproved,
      },
    };
  } catch (error) {
    console.error(`failed to fetch submission ${submissionId}`, error);
  }

  return {
    notFound: true,
  };
}) satisfies GetServerSideProps<Props>;

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
