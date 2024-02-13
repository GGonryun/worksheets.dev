import { LayoutContainer } from '@worksheets/ui/layout';
import { ErrorScreen } from '@worksheets/ui/pages/errors';
import { DynamicGameSubmissionScreen } from '@worksheets/ui/pages/game-submissions';
import { NextPageWithLayout } from '@worksheets/util-next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import { submitGameSeo } from '../../../util/seo';

const Page: NextPageWithLayout = () => {
  const { query } = useRouter();
  const submissionId = query.submissionId as string | undefined;

  if (!submissionId) {
    return <ErrorScreen />;
  }

  return (
    <>
      <NextSeo {...submitGameSeo} />
      <DynamicGameSubmissionScreen submissionId={submissionId} />
    </>
  );
};

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
