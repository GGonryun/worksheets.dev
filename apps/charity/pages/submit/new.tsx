import { NextPageWithLayout } from '@worksheets/util-next';
import { LayoutContainer } from '../../containers/layout-container';

import { GetServerSideProps } from 'next/types';
import { createServerSideTRPC } from '@worksheets/trpc-charity/server';
import { UserProfile } from '@worksheets/ui/pages/account';
import { trpc } from '@worksheets/trpc-charity';
import { CreateGameSubmissionScreen } from '@worksheets/ui/pages/game-submissions';
import { NextSeo } from 'next-seo';
import { createGameSubmissionSeo } from '../../util/seo';

type Props = {
  profile: UserProfile;
};

const Page: NextPageWithLayout<Props> = () => {
  const createSubmission = trpc.game.submissions.create.useMutation();

  return (
    <>
      <NextSeo {...createGameSubmissionSeo} />
      <CreateGameSubmissionScreen
        createSubmission={createSubmission.mutateAsync}
      />
      ;
    </>
  );
};

export const getServerSideProps = (async (ctx) => {
  const trpc = await createServerSideTRPC(ctx);

  const profile = await trpc.profile.get.fetch();

  if (!profile) {
    return {
      redirect: {
        destination: '/account',
        permanent: false,
      },
    };
  }

  return {
    props: {
      profile,
    },
  };
}) satisfies GetServerSideProps<Props>;

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
