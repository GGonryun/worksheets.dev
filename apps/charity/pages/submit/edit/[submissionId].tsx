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
  submission: Nullable<GameSubmissionForm>;
  invalidProfile: boolean;
};

const Page: NextPageWithLayout<Props> = ({ submission, invalidProfile }) => {
  // TODO: implement this page
  return (
    <>
      <NextSeo {...submitGameSeo} />
      <GameSubmissionScreenContainer
        submission={submission}
        invalidProfile={invalidProfile}
      />
    </>
  );
};

export const getServerSideProps = (async (ctx) => {
  const { params } = ctx;

  const submissionId = params?.submissionId as string | undefined;

  const trpc = await createServerSideTRPC(ctx);

  const terms = await trpc.profile.terms.get.fetch();

  let submission: Nullable<GameSubmissionForm>;

  try {
    submission = await trpc.game.submissions.get.fetch({
      id: submissionId ?? '',
    });
  } catch (error) {
    return {
      notFound: true,
    };
  }

  if (!submission || !submission.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      submission,
      invalidProfile: !terms.hasApproved,
    },
  };
}) satisfies GetServerSideProps<Props>;

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
