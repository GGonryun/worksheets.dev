import { createServerSideTRPC } from '@worksheets/trpc-charity/server';
import {
  BasicGameSubmission,
  BasicInformationForm,
} from '@worksheets/ui/pages/account';
import { NextPageWithLayout } from '@worksheets/util-next';
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';

import { AccountScreenContainer } from '../../containers/account-screen-container';
import { LayoutContainer } from '../../containers/layout-container';
import { submissionsSeo } from '../../util/seo';

type Props = {
  profile: BasicInformationForm | null;
  submissions: BasicGameSubmission[] | null;
};

const Page: NextPageWithLayout<Props> = (props) => {
  return (
    <>
      <NextSeo noindex {...submissionsSeo} />
      <AccountScreenContainer {...props} />
    </>
  );
};

export const getServerSideProps = (async (ctx) => {
  const trpc = await createServerSideTRPC(ctx);

  const [profile, submissions] = await Promise.all([
    trpc.profile.get.fetch(),
    trpc.game.submissions.list.fetch(),
    trpc.profile.terms.get.prefetch(),
  ]);

  return {
    props: { profile, submissions, trpcState: trpc.dehydrate() },
  };
}) satisfies GetServerSideProps<Props>;

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
