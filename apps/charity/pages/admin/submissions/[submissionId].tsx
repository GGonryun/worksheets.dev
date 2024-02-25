import { AppLayoutContainer } from '@worksheets/ui/layout';
import { DynamicAdminSubmissionScreen } from '@worksheets/ui/pages/admin';
import { NextPageWithLayout } from '@worksheets/util-next';
import { NextSeo } from 'next-seo';

import { adminMiddleware } from '../../../util/middleware/admins-only';

type Props = {
  submissionId: string;
};

const Page: NextPageWithLayout<Props> = ({ submissionId }) => (
  <>
    <NextSeo noindex title="Admin - Game Submission Details" />
    <DynamicAdminSubmissionScreen submissionId={submissionId} />
  </>
);

export const getServerSideProps = adminMiddleware<Props>(async (ctx) => {
  const submissionId = ctx.params?.submissionId as string;
  if (!submissionId) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      submissionId,
    },
  };
});

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
